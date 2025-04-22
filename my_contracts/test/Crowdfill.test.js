const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfill", function () {
  let crowdfill;
  let testToken;
  let owner;
  let seller;
  let buyer;
  let feeCollector;

  beforeEach(async function () {
    [owner, seller, buyer, feeCollector] = await ethers.getSigners();

    // Deploy TestToken
    const TestToken = await ethers.getContractFactory("TestToken");
    testToken = await TestToken.deploy();
    await testToken.deployed();

    // Deploy Crowdfill
    const Crowdfill = await ethers.getContractFactory("Crowdfill");
    crowdfill = await Crowdfill.deploy(feeCollector.address);
    await crowdfill.deployed();

    // Mint tokens to seller
    await testToken.mint(seller.address, ethers.utils.parseEther("1000"));
  });

  describe("Order Creation", function () {
    it("Should create an order correctly", async function () {
      const amount = ethers.utils.parseEther("100");
      const price = ethers.utils.parseEther("0.001"); // 0.001 ETH per token

      await testToken.connect(seller).approve(crowdfill.address, amount);
      await expect(crowdfill.connect(seller).createOrder(testToken.address, amount, price))
        .to.emit(crowdfill, "OrderCreated")
        .withArgs(0, seller.address, testToken.address, amount, price);
    });
  });

  describe("Order Filling", function () {
    let orderId;
    const amount = ethers.utils.parseEther("100");
    const price = ethers.utils.parseEther("0.001");

    beforeEach(async function () {
      await testToken.connect(seller).approve(crowdfill.address, amount);
      const tx = await crowdfill.connect(seller).createOrder(testToken.address, amount, price);
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "OrderCreated");
      orderId = event.args.orderId;
    });

    it("Should fill an order correctly", async function () {
      const fillAmount = ethers.utils.parseEther("50");
      const value = fillAmount.mul(price).div(ethers.utils.parseEther("1"));

      await expect(crowdfill.connect(buyer).fillOrder(orderId, fillAmount, { value }))
        .to.emit(crowdfill, "OrderFilled")
        .withArgs(orderId, buyer.address, fillAmount, value);

      // Check token balance
      expect(await testToken.balanceOf(buyer.address)).to.equal(fillAmount);
    });

    it("Should handle partial fills correctly", async function () {
      const fillAmount1 = ethers.utils.parseEther("30");
      const fillAmount2 = ethers.utils.parseEther("70");
      const value1 = fillAmount1.mul(price).div(ethers.utils.parseEther("1"));
      const value2 = fillAmount2.mul(price).div(ethers.utils.parseEther("1"));

      // First fill
      await crowdfill.connect(buyer).fillOrder(orderId, fillAmount1, { value: value1 });

      // Second fill
      await crowdfill.connect(buyer).fillOrder(orderId, fillAmount2, { value: value2 });

      // Check final balances
      expect(await testToken.balanceOf(buyer.address)).to.equal(amount);
    });
  });

  describe("Order Management", function () {
    let orderId;
    const amount = ethers.utils.parseEther("100");
    const price = ethers.utils.parseEther("0.001");

    beforeEach(async function () {
      await testToken.connect(seller).approve(crowdfill.address, amount);
      const tx = await crowdfill.connect(seller).createOrder(testToken.address, amount, price);
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "OrderCreated");
      orderId = event.args.orderId;
    });

    it("Should allow seller to close order", async function () {
      await expect(crowdfill.connect(seller).closeOrder(orderId))
        .to.emit(crowdfill, "OrderClosed")
        .withArgs(orderId);

      const order = await crowdfill.getOrder(orderId);
      expect(order.isActive).to.be.false;
    });

    it("Should allow seller to cancel unfilled order", async function () {
      await expect(crowdfill.connect(seller).cancelOrder(orderId))
        .to.emit(crowdfill, "OrderCancelled")
        .withArgs(orderId);

      const order = await crowdfill.getOrder(orderId);
      expect(order.isActive).to.be.false;
    });

    it("Should not allow cancellation of partially filled order", async function () {
      const fillAmount = ethers.utils.parseEther("50");
      const value = fillAmount.mul(price).div(ethers.utils.parseEther("1"));

      await crowdfill.connect(buyer).fillOrder(orderId, fillAmount, { value });

      await expect(crowdfill.connect(seller).cancelOrder(orderId))
        .to.be.revertedWith("Cannot cancel partially filled order");
    });
  });

  describe("Fee Management", function () {
    it("Should collect platform fees correctly", async function () {
      const amount = ethers.utils.parseEther("100");
      const price = ethers.utils.parseEther("0.001");
      const fillAmount = ethers.utils.parseEther("50");
      const value = fillAmount.mul(price).div(ethers.utils.parseEther("1"));
      const expectedFee = value.mul(50).div(10000); // 0.5% fee

      await testToken.connect(seller).approve(crowdfill.address, amount);
      const tx = await crowdfill.connect(seller).createOrder(testToken.address, amount, price);
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "OrderCreated");
      const orderId = event.args.orderId;

      const initialBalance = await ethers.provider.getBalance(feeCollector.address);
      await crowdfill.connect(buyer).fillOrder(orderId, fillAmount, { value });
      const finalBalance = await ethers.provider.getBalance(feeCollector.address);

      expect(finalBalance.sub(initialBalance)).to.equal(expectedFee);
    });
  });
}); 