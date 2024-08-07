import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
    await loadProductsFetch();

  let orderHTML = '';

  orders.forEach((order) => {
    const orderId = order.id;
    const orderTime = order.orderTime;
    const totalCostCents = order.totalCostCents;
    const orderTimeString = dayjs(orderTime).format('MMMM D');

    orderHTML += ` 
          <div class="order-container">  
            <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${orderTimeString}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>${formatCurrency(totalCostCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${orderId}</div>
              </div>
            </div>
            <div class="order-details-grid">
            ${productsInOrder(order)}
            </div>
        </div>
          `
  });

  function productsInOrder(order) {
    let productsInOrderHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      productsInOrderHTML += 
          `
              <div class="product-image-container">
                <img src="${product.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
                </div>
                <div class="product-quantity">
                  Quantity: ${productDetails.quantity}
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
            `
    });
    return productsInOrderHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = orderHTML;
}
loadPage();