// GLobal Object
const globalObj = {
   navigationSpeed: 5,
   navigationCounter: 20,
   dropListTopSpace: 15,
   deleteAddAnimationSpeed: 5,
   deleteAddAnimationCounter: 5,
   mobDeleteAddAnimationSpeed: 10,
   mobDeleteAddAnimationCounter: 20,
   signatureError: 'Please Sign First',
   productsListError: 'Please Add More Products',
   status: {
      prodcutDropDown: false,
      currRowItem: null,
      currRowItemHeight: 0,
      hideRowTitle: false,
      emptyList: false,
      signature: false,
      pageLoaderImagesCounter: 0
   },
   closest: function(ele, name) {
      while (ele !== document.querySelector('html')) {
         if (name[0] !== '.' && name[0] !== '#') {
            if (ele.tagName.toLowerCase() === name) {
               return ele;
            } else {
               ele = ele.parentElement;
            }
         } else if (name[0] === '.') {
            if (ele.classList.contains(name.slice(1))) {
               return ele;
            } else {
               ele = ele.parentElement;
            }
         } else if (name[0] === '#') {
            if (ele.id === name.slice(1)) {
               return ele;
            } else {
               ele = ele.parentElement;
            }
         }
      }
      if (ele === document.querySelector('html')) {
         return false;
      }
   }
};
// Page Loader
pageLoaderFun();
(function() {   
   //*** Navbar ***
   // Line animation on hover nav-link
   const  nav     = document.querySelector('nav'),
          navLink = nav.querySelectorAll('nav .nav-link');
   navLink.forEach(function(item) {
      item.addEventListener('mouseenter', function(e) {
         // On Mouse eneter
         e.target.classList.add('active');
      });
      item.addEventListener('mouseleave', function(e) {
         // On Mouse leave
         e.target.classList.remove('active');
      });
   });

   // mob toggler button
   const navTogBtn = nav.querySelector('.navbar-toggler');
   navTogBtn.addEventListener('click', navbarMobToggler);

   // *** Instructions ***
   insBoxContent();

   // *** Payment Info ***
   paymentInfoTable();

   // *** Product Section ***
   // More - Less Product Description
   productMoreLessTxt();
   // Table Mobile Layout
   productMobileLayout();

   // *** Total Payment ***
   totalPaymentFun();

   // *** Footer Section ***
   const footerSection = document.querySelector('.footer-section'),
         signatureBox  = footerSection.querySelector('.sign-box'),
         uploadSignature = signatureBox.querySelector('#sign-upload');
   
   // On click on signature box
   signatureBox.addEventListener('click', signatureBoxFun);
   // On upload image
   uploadSignature.addEventListener('change', signatureUploadSign);
   // Approve button status
   approveBtnStatus();
   // On click on Approve button
   const approveBtn = footerSection.querySelector('.approve-btn')
   approveBtn.addEventListener('click', approveBtnFun);

   // *** PayNow ***
   const payNow = document.querySelector('.pay-now-container'),
         payNowInputs = payNow.querySelectorAll('.form-content input');
   // on form type
   for (let i = 0; i < payNowInputs.length; i++) {
      payNowInputs[i].addEventListener('input', payNowInputType);
   }

   // *** Chat Box ***
   const chatBox = document.querySelector('.chatbox-container'),
         chatTxtBox = chatBox.querySelector('#chat-txtbox');
   
   // Om type message
   chatTxtBox.addEventListener('input', chatBoxPlcHolder);
   
   // *** Call Global Functions on load ***
   window.onload = function() {
      headerCurve();
   }

   // *** Global Events ***
   // On Window Resize
   window.addEventListener('resize', function() {
      headerCurve();
      insBoxContent();
      paymentInfoTable();
      productMobileLayout();
   });
   // On Window Click
   window.addEventListener('click', function(e) {
      if ((!globalObj.closest(e.target, '.droplist-container') && (!globalObj.status.prodcutDropDown && document.querySelector('.product-table .droplist-container.active'))) || (globalObj.closest(e.target, '.drop-item') && globalObj.closest(e.target, '.droplist-container'))) {
         // Product DropList - Hide
         productHideDropList(e);
      }
      if (globalObj.closest(e.target, '.nav-link') || globalObj.closest(e.target, '.nav-approve-btn')) {
         // Navbar Navigation
         if (globalObj.closest(e.target, '.nav-link')) {
            navbarNavigation(globalObj.closest(e.target, '.nav-link'), false);
         } else {
            let approveBtn = document.querySelector('.footer-section .approve-btn');
            if (!approveBtn.classList.contains('disabled')) {
               approveBtnFun();
            } else {
               navbarNavigation(null, true);
            }
         }
      } else if (globalObj.closest(e.target, '.table-content') === document.querySelector('.product-section .table-content')) {
         // On Click on Product table
         productTableFun(e);
      } else if (e.target.classList.contains('pay-now-container') || globalObj.closest(e.target, '.close-paynow')) {
         // PayNow popup close
         payNowPopupClose(e);
      } else if (globalObj.closest(e.target, '.payment-box') && globalObj.closest(e.target, '.pay-now-container')) {
         // PayNow Choose Payment Method
         payNowChoosePayMethod(globalObj.closest(e.target, '.payment-box'));
      }
      if (globalObj.closest(e.target, '.messages-btn')) {
         // Display ChatBox on click on messages navbar icon
         chatBoxDisplay(true, null);
      } else if (globalObj.closest(e.target, '.chat-close') || (!globalObj.closest(e.target, '.chatbox-container') && (!globalObj.closest(e.target, '.navbar') && !globalObj.closest(e.target, '.btn-discuss-icon')))) {
         if (document.querySelector('.chatbox-container.active')) {
            // Hide ChatBox on click on close chatbox button or outside chatbox container
            chatBoxDisplay(false, null);
         }
      } else if (globalObj.closest(e.target, '.chat-sendmsg')) {
         // chat box - send message on click send button
         chatBoxSendMsg(true, null);
      } else if (globalObj.closest(e.target, '.btn-discuss-icon')) {
         // product table info
         let rowContainer = globalObj.closest(e.target, '.row-container'),
             productName = rowContainer.querySelector('.product-name .title').textContent,
             productPic = rowContainer.querySelector('.product-name .pic img');
         chatBoxDisplay(true, {name: productName, pic: productPic});
      } else if (globalObj.closest(e.target, '.chatbox-protag-close')) {
         // Chatbox - delete product tag on click on delete icon
         chatBoxDeleteProTag();
      }
   });
   // On press Enter
   window.addEventListener('keydown', function(e) {
      if ((e.key === 'Enter' || e.keyCode === 13) && (document.querySelector('.chatbox-container.active'))) {
         // Send Message in chat box
         let input = document.querySelector('.chatbox-container.active #chat-txtbox');
         if (input.value !== '' && document.activeElement.id === 'chat-txtbox') {
            chatBoxSendMsg(true, null);
         }
      }
   });

}());


// Navbar mob toggler button
function navbarMobToggler() {
   let nav = document.querySelector('nav.navbar'),
       navList   = nav.querySelector('.navbar-collapse');
   if (!this.classList.contains('active')) {
      if (!navList.classList.contains('ready')) {
         navList.classList.add('d-block');
         let navListHeight = navList.offsetHeight,
             cusStyle = document.createElement('style'),
             styleTxt = '.navbar .navbar-collapse.ready.active {height:' + navListHeight + 'px;} @keyframes navListDown {0% {height: 0px;} 100% {height: ' + navListHeight +'px;}}@keyframes navListUp {0% {height: ' + navListHeight +'px;} 100% {height: 0px;}}';
         cusStyle.appendChild(document.createTextNode(styleTxt));
         document.head.appendChild(cusStyle);
      }
      this.classList.add('active');
      navList.classList.add('ready');
      navList.classList.add('active');
      navList.classList.remove('d-block');
   } else {
      this.classList.remove('active');
      navList.classList.remove('active');
   }
}

// Navbar = navigation on links click
function navbarNavigation(link, btm) {
   let section,sectionPos,winPos,status;
   winPos = window.scrollY;
   if (!btm) {
      section = document.querySelector('.' + link.getAttribute('href').slice(1)),
      sectionPos = document.querySelector('.' + link.getAttribute('href').slice(1)).offsetTop - 100;
   } else {
      sectionPos = document.body.scrollHeight;
   }
   if (btm || window.scrollY !== sectionPos) {
      let animation = setInterval(frame, globalObj.navigationSpeed);
      if (!btm) {
         if (section.tagName.toLowerCase() !== 'section') {
            sectionPos = sectionPos + globalObj.closest(section, 'section').offsetTop;
         }
         if (section.style.paddingTop !== '') {
            sectionPos += Number(section.style.paddingTop.replace('px', ''));
         }
      }
      if (winPos > sectionPos && !btm) {
         // Go Up
         status = false;
      } else {
         // Go Down
         status = true;
      }
      function frame() {
         if (status) {
            if (winPos >= sectionPos) {
               clearInterval(animation);
            } else {
               winPos += globalObj.navigationCounter;
               window.scrollTo(0, winPos);
            }
         } else {
            if (winPos <= sectionPos) {
               clearInterval(animation);
            } else {
               winPos -= globalObj.navigationCounter;
               window.scrollTo(0, winPos);
            }
         }
      }
   }
}

// Header Curve
function headerCurve() {
   let curve = document.querySelector('.section-company .header-curve').offsetHeight,
       instructionsSection = document.querySelector('section.instructions-section');
   instructionsSection.style.marginTop = '-' + curve + 'px';
   instructionsSection.style.paddingTop = curve + 'px';
}

// Instructions insert/extract firt content box inside/outside second row
function insBoxContent() {
   let section = document.querySelector('.instructions-section'),
       rows    = section.querySelectorAll('.row');
   if (window.innerWidth <= 767 && !section.classList.contains('active')) {
      if (rows.length > 1 && rows[0].querySelector('.box-content')) {
         section.classList.add('active');
         rows[0].querySelector('.box-content').classList.add('first-box');
         rows[1].insertAdjacentElement('afterbegin', rows[0].querySelector('.box-content'));
      }
   } else if (window.innerWidth > 767 && section.classList.contains('active')) {
      section.classList.remove('active');
      rows[0].appendChild(rows[1].querySelector('.box-content.first-box'));
   }
}

// Payment Info Table Mobile Screen
function paymentInfoTable() {
   let section = document.querySelector('.invoice-section'),
       tableHeading = document.querySelector('.table-heading').children,
       tableContent = section.querySelector('.table-content').children;
   if (window.innerWidth <= 767 && !section.classList.contains('active')) {
      section.classList.add('active');
      for (let i = 0; i < tableContent.length; i++) {
         for (let a = 0; a < tableHeading.length; a++) {
            let title = tableHeading[a].children[0].cloneNode(true);
            title.textContent = title.textContent + ":";
            title.classList.add('mob-heading');
            tableContent[i].children[a].insertAdjacentElement('afterbegin', title);
         }
      }
   }
}

// Product table - plus & minus button
function productPlusMinusBtn(ele, status) {
   let input = ele.parentElement.parentElement.querySelector('.quantity-val');
   // Input animation
   productInputAnim(ele);

   if (status) {
      if (Number(input.value) !== Number(input.getAttribute('max'))) {
         input.value = Number(input.value) + 1;
      }
   } else {
      if (Number(input.value) !== Number(input.getAttribute('min'))) {
         input.value = Number(input.value) - 1;
      }
   }
   // Get Total Price
   productGetTotal(globalObj.closest(ele, '.row-container'), input.value);
   // Get Total Payment
   totalPaymentFun();
}

// Product table - PLus & Minus input animation
function productInputAnim(ele) {
   let input = ele.parentElement.parentElement.querySelector('.quantity-val');
   input.classList.add('active');
   setTimeout(function() {
      input.classList.remove('active');
   }, 100);
}

// Product table - zoom product image
function productZoomImg(ele) {
   let   section = document.querySelector('.product-section'),
         img  = ele.querySelector('img'),
         imgSrc = img.src;
   if (!section.classList.contains('cover-done')) {
      section.classList.add('cover-done');
      // Create Overlay
      let div = document.createElement('div');
      div.className = 'product-cover-overlay position-fixed justify-content-center align-items-center w-100 h-100';
      div.innerHTML = '<div class="inner-cover h-100 d-flex align-items-center position-relative"><span class="cover-close-icon position-absolute d-flex"><i class="far fa-times-circle"></i></span><img class="img-fluid" src="#" alt=""></div>';
      document.body.appendChild(div);
      // Hide Overlay and image on click on close button or outside the image
      setTimeout(function() {
         document.querySelector('.product-cover-overlay').addEventListener('click', function(e) {
            if (globalObj.closest(e.target, '.cover-close-icon') || (e.target.classList.contains('product-cover-overlay') || e.target.classList.contains('inner-cover'))) {
               this.classList.remove('active');
               this.classList.add('active2');
               let self = this;
               setTimeout(function() {
                  self.classList.remove('active2');
               }, 250);
            }
         }, 100);
      })
   }
   let cover = document.querySelector('.product-cover-overlay'),
       coverImg = cover.querySelector('img');
   coverImg.src = imgSrc;
   if (img.getAttribute('alt')) {
      coverImg.setAttribute('alt', img.getAttribute('alt'));
   }
   coverImg.onload = function() {
      cover.classList.add('active');
   }
}

// Product table - More & Less description
function productMoreLessTxt() {
   let section = document.querySelector('.product-section'),
       description = section.querySelectorAll('.product-content .description'),
       pic = section.querySelectorAll('.product-pic .pic'),
       maxNum = 78;
   if (window.innerWidth <= 991) {
      maxNum = 170;
   }
   for (let i = 0; i < description.length; i++) {
      let txtLen = description[i].textContent.length;
      if (txtLen > maxNum) {
         let txt = description[i].textContent.slice(0, maxNum),
            txt2 = description[i].textContent.slice(maxNum + 1, txtLen);
         description[i].innerHTML = txt + '<span class="txt2">' + txt2 + '</span>' + '<span class="len-btn highlight bold2 user-select-none">...MORE</span>';
      }
   }
}

// Product table - Show More - Less Description on btn click
function productMoreLessBtn(ele) {
   let description = globalObj.closest(ele, '.description');
   if (!description.classList.contains('active')) {
      description.classList.add('active');
      ele.textContent = ' LESS';
   } else {
      description.classList.remove('active');
      ele.textContent = '...MORE';
   }
}

// Product table - Delete item DropList
function productDeleteDropList(ele) {
   let table = document.querySelector('.product-section .product-table'),
       tablePos = table.getBoundingClientRect().top,
       btnPos = ele.getBoundingClientRect().bottom + globalObj.dropListTopSpace,
       getPos = btnPos - tablePos,
       DropList = table.querySelector('.droplist-container');
   DropList.style.top = getPos + 'px';
   DropList.classList.add('active');
   setTimeout(function() {
      globalObj.status.prodcutDropDown = false;
   }, 10);
}

// Product table - Hide DropList
function productHideDropList(e) {
   let dropList = document.querySelector('.product-table .droplist-container.active');
   dropList.classList.remove('active');
   dropList.classList.add('active2');
   if (globalObj.closest(e.target, '.drop-item')) {
      // Hide Row Container
      if (globalObj.status.currRowItem.parentElement.children.length <= 1) {
         globalObj.status.emptyList = true;
      }
      productHideRowItem(true, false);
   }
   setTimeout(function() {
      dropList.classList.remove('active2');
   }, 260);
}

// Product table - Hide/Add row container when delete/add item
function productHideRowItem(status, add) {
   let ele = globalObj.status.currRowItem,
       tableContent = globalObj.closest(ele, '.table-content'),
       currContent = tableContent.querySelector('.current-products'),
       eleHeight = globalObj.status.currRowItemHeight,
       counter = 0, animation,
       speed = globalObj.deleteAddAnimationSpeed;
       smoothSpeed = globalObj.deleteAddAnimationCounter;
   if (window.innerWidth <= 991) {
      speed = globalObj.mobDeleteAddAnimationSpeed;
      smoothSpeed = globalObj.mobDeleteAddAnimationCounter;
   }
   if (status) {
      animation = setInterval(frame, speed);
   } else {
      animation = setInterval(frame2, speed);
   }
   // Slide Up movement
   function frame() {
      if (eleHeight <= 0) {
         ele.style.height = '0px';
         if (!add) {
            if (globalObj.status.emptyList) {
               let div = document.createElement('div');
               div.className = 'row-container empty-row justify-content-center align-items-center bold d-flex';
               div.innerHTML = '<p class="mb-0">Empty List</p>';
               div.style.position = 'absolute';
               div.style.opacity = 0;
               ele.parentElement.appendChild(div);
               globalObj.status.currRowItem = div;
               globalObj.status.currRowItemHeight = div.offsetHeight
               ele.remove();
               setTimeout(function() {
                  div.style.height = '0px';
                  div.style.position = 'static';
                  div.style.opacity = 1;

               })
               clearInterval(animation);
               productHideRowItem(false, true);
               // Approve button status
               approveBtnStatus();
            } else {
               ele.remove();
               clearInterval(animation);
               // Get Total Payment
               totalPaymentFun();
            }
         } else {
            ele.style.display = 'none';
            if (globalObj.status.hideRowTitle) {
               globalObj.status.currRowItem.parentElement.previousElementSibling.style.display = 'none';
            }
            currContent.appendChild(ele);
            ele.style.display = 'flex';
            clearInterval(animation);
            productHideRowItem(false, true);
         }
      } else {
         eleHeight -= smoothSpeed;
         ele.style.height = eleHeight + 'px';
      }
   }
   // Slide Down movement
   function frame2() {
      if (counter >= eleHeight) {
         ele.style.height = 'inherit';
         globalObj.status.currRowItem = null;
         clearInterval(animation);
         // Get Total Payment
         totalPaymentFun();
      } else {
         counter += smoothSpeed;
         ele.style.height = counter + 'px';
      }
   }
}

// Product table - Add optional item
function productAddOptItem() {
   productHideRowItem(true, true);
}

// Product table - Get Total Price
function productGetTotal(ele, amount) {
   let total = ele.querySelector('.product-total p .total-num'),
       num = ele.querySelector('.product-w-discount p').textContent,
       reg = new RegExp('[0-9]+', 'g'),
       getPrice = Number(reg.exec(num.trim())) * Number(amount);
   total.textContent = getPrice;
}

// Product Table - Mobile layout
function productMobileLayout() {
   let section = document.querySelector('.product-section');
   if (window.innerWidth <= 991 && !section.classList.contains('mob-active')) {
      section.classList.add('mob-active');
      let rowContainer = section.querySelectorAll('.row-container'),
          heading = section.querySelectorAll('.table-heading .product-cell');
      for (let i = 0; i < rowContainer.length; i++) {
         let   content = rowContainer[i].querySelector('.product-content'),
               rowCell = rowContainer[i].querySelectorAll('.product-cell'),
               container = document.createElement('div');
         container.className = 'mob-content';
         container.innerHTML = '<div class="table-mob-content"></div><div class="table-mob-btn"></div>';
         content.appendChild(container);
         for (let a = 1; a < heading.length; a++) {
            let headingTxt = heading[a].querySelector('p'),
                div = document.createElement('div'),
                cellCopy = rowCell[a].cloneNode(true),
                pos;
            div.className = 'mob-row';
            if (headingTxt !== null) {
               headingTxt = headingTxt.textContent;
               pos = container.querySelector('.table-mob-content');
               div.innerHTML = '<div class="mob-title"><p>' + headingTxt +'</p></div>';
            } else {
               pos = container.querySelector('.table-mob-btn');
            }
            div.appendChild(cellCopy);
            pos.appendChild(div);
         }
      }
   }
}

// Product Table Main Function
function productTableFun(e) {
   if (globalObj.closest(e.target, '.btn-plus')) {
      // Plus Button
      productPlusMinusBtn(globalObj.closest(e.target, '.btn-plus'), true);
   } else if (globalObj.closest(e.target, '.btn-minus')) {
      // Minus Button
      productPlusMinusBtn(globalObj.closest(e.target, '.btn-minus'), false);
   } else if (globalObj.closest(e.target, '.pic')) {
      // Zoom Product Image
      productZoomImg(globalObj.closest(e.target, '.pic'));
   } else if (globalObj.closest(e.target, '.len-btn')) {
      // More - Less description button
      productMoreLessBtn(globalObj.closest(e.target, '.len-btn'));
   } else if (globalObj.closest(e.target, '.btn-delete-icon')) {
      // Delete Item
      let rowItem = globalObj.closest(e.target, '.row-container');
      globalObj.status.prodcutDropDown = true;
      globalObj.status.currRowItem = rowItem;
      globalObj.status.currRowItemHeight = rowItem.offsetHeight;
      productDeleteDropList(globalObj.closest(e.target, '.btn-delete-icon'));
   } else if (globalObj.closest(e.target, '.btn-add')) {
      // Add Optional item button
      let rowItem = globalObj.closest(e.target, '.row-container'),
          rowLen = rowItem.parentElement.children.length,
          description = rowItem.querySelector('.description');
      // Check for last item in optional list then hide optional title with the item
      if (rowLen <= 1) {
         globalObj.status.hideRowTitle = true;
      }
      // check for item description if open close it first
      if (description.classList.contains('active')) {
         productMoreLessBtn(description.querySelector('.len-btn'));
      }
      // check for empty list then remove it
      if (globalObj.status.emptyList) {
         globalObj.status.emptyList = false;
         rowItem.parentElement.parentElement.querySelector('.empty-row').remove();
         // Approve button status
         approveBtnStatus();
      }
      globalObj.status.currRowItem = rowItem;
      globalObj.status.currRowItemHeight = rowItem.offsetHeight;
      productAddOptItem();
   }
}

// Total Payment - get all total
function totalPaymentFun() {
   let products = document.querySelectorAll('.product-section .current-products .row-container'),
       totalPaymentSection = document.querySelector('.total-section'),
       subTotal = totalPaymentSection.querySelector('.subtotal-num span'),
       tax = totalPaymentSection.querySelector('.tax-num span'),
       discount = totalPaymentSection.querySelector('.discount-num span'),
       total = totalPaymentSection.querySelector('.total-num span'),
       totalBox = totalPaymentSection.querySelector('.total-box-num'),
       productQuantity, productUnitPrice, productDiscount,
       arr = [0, Number(tax.textContent), 0]; 
   if (!products[0].classList.contains('empty-row')) {
      for (let i = 0; i < products.length; i++) {
         // Get Values
         productQuantity = products[i].querySelector('.product-quantity .quantity-val').value;
         productUnitPrice = products[i].querySelector('.product-price .product-num').textContent;
         productDiscount = products[i].querySelector('.product-discount .discount-num').textContent;
         // Execute Values
         if (!isNaN(productUnitPrice)) {
            // SubTotal
            arr[0] = arr[0] + (Number(productQuantity) * Number(productUnitPrice));
         }
         if (!isNaN(productDiscount)) {
            // Discounts
            arr[2] = arr[2] + Number(productDiscount);
         }
      }

      // Insert Values
      subTotal.textContent = arr[0];
      tax.textContent = arr[1]
      discount.textContent = arr[2];
      total.textContent = arr[0] - (arr[1] + arr[2]);
      totalBox.textContent = arr[0] - (arr[1] + arr[2]);

   } else {
      // Insert Values
      subTotal.textContent = 0;
      discount.textContent = 0;
      total.textContent = 0;
      totalBox.textContent = 0;
   }
   // Approve button status
   approveBtnStatus();
}

// Signature - on click signature box
function signatureBoxFun() {
   if (!this.classList.contains('loading')) {
      const input = this.querySelector('#sign-upload');
      input.click();
   }
}

// Signature - on upload signature
function signatureUploadSign() {
   if (this.files && this.files[0]) {
      if (this.files[0].type === 'image/jpeg' || this.files[0].type === 'image/png') {
         let reader = new FileReader(),
            container = this.parentElement,
            overlay = container.querySelector('.overlay'),
            img;
         container.classList.add('loading');
         if (!container.querySelector('img')) {
            img = document.createElement('img');
            img.className = 'img-fluid';
         } else {
            container.classList.remove('active');
            img = container.querySelector('img');
         }
         reader.onload = function(e) {
            globalObj.status.signature = false;
            // Approve button status
            approveBtnStatus();
            img.src = e.target.result;
            container.appendChild(img);
            container.classList.add('active');
            setTimeout(function() {
               overlay.classList.add('active');
               setTimeout(function() {
                  container.classList.add('loading2');
                  globalObj.status.signature = true;
                  setTimeout(function() {
                     container.classList.remove('loading');
                     container.classList.remove('loading2');
                     overlay.classList.remove('active');
                     // Approve button status
                     approveBtnStatus();
                  }, 260);
               }, 500);
            }, 1000);
         }
         reader.readAsDataURL(this.files[0]);
      }
   }
}

// Approve button status
function approveBtnStatus() {
   let btn = document.querySelector('.footer-section .approve-btn'),
       totalPayment = Number(document.querySelector('.total-section .total-box-num').textContent);
   if (globalObj.status.emptyList || totalPayment <= 0) {
      btn.classList.add('disabled');
      btn.textContent = globalObj.productsListError;
   } else if (!globalObj.status.signature) {
      btn.classList.add('disabled');
      btn.textContent = globalObj.signatureError;
   } else {
      btn.textContent = 'APPROVE';
      btn.classList.remove('disabled');
   }
}

// Approve button on click
function approveBtnFun() {
   let approveBtn = document.querySelector('.footer-section .approve-btn');
   if (!approveBtn.classList.contains('disabled')) {
      let container = document.querySelector('.pay-now-container'),
          total = document.querySelector('.total-section .total-num-box'),
          payNowBtn = container.querySelector('.pay-btn span');
      // check validation
      payNowCheckValidation();
      payNowBtn.textContent = total.textContent;
      container.classList.add('active');
      setTimeout(function() {
         container.querySelector('.content').classList.add('active');
      }, 300);
   }
}

// PayNow Popup Close
function payNowPopupClose(e) {
   let overlay = globalObj.closest(e.target, '.pay-now-container');
   overlay.classList.add('active2');
   setTimeout(function() {
      overlay.classList.remove('active');
      overlay.classList.remove('active2');
      overlay.querySelector('.content').classList.remove('active');
   }, 260);
}

// PayNow - On click on payment method
function payNowChoosePayMethod(ele) {
   if (!ele.classList.contains('active')) {
      let formContent = ele.parentElement.parentElement.querySelector('.form-content');
      ele.parentElement.querySelector('.active').classList.remove('active');
      ele.classList.add('active');
      if (ele.classList.contains('form-check')) {
         formContent.style.display = 'block';
      } else {
         formContent.style.display = 'none';
         let inputs = formContent.querySelectorAll('input');
         for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
            inputs[i].parentElement.classList.remove('valid');
            inputs[i].parentElement.classList.remove('invalid');
            inputs[i].parentElement.classList.remove('active');
         }
      }
      // check validation
      payNowCheckValidation();
   }
}

// PayNow - input type
function payNowInputType() {
   let container = this.parentElement;
   // add active on inputs container
   if (this.value === '') {
      container.classList.remove('active');
      if (container.classList.contains('valid')) {
         container.classList.remove('valid');
      }
   } else {
      if (!container.classList.contains('active')) {
         container.classList.add('active');
      }
      // check limit
      if (this.hasAttribute('max')) {
         let max = Number(this.getAttribute('max'));
         if (this.value.length > max) {
            this.value = this.value.slice(0,-1);
         }
      }
      // check text only input
      if (this.classList.contains('txt-only')) {
         if (!(/^\D+$/g.test(this.value))) {
            this.value = this.value.slice(0, -1);
            if (this.value === '') {
               container.classList.remove('active');
            }
         } else if (!container.classList.contains('valid')) {
            container.classList.add('valid');
         }
      }

      // check expiration date
      if (this.id === 'card-expiration') {
         if (!(/^\d+$/g.test(this.value))) {
            if (this.value.length <= 2 || !(/^\d{2}\/\d+$/g.test(this.value))) {
               this.value = this.value.slice(0,-1);
            }
         } else if (this.value.length === 2) {
            this.value += '/';
         }
         if (/^\d{2}\/\d{2}$/g.test(this.value)) {
            container.classList.add('valid');
            container.classList.remove('invalid');
         } else if (container.classList.contains('valid')) {
            container.classList.remove('valid');
            container.classList.add('invalid');
         }
      }
      // check limit & add/remove class Valid
      if (this.hasAttribute('max')) {
         let max = Number(this.getAttribute('max'));
         if (this.value.length === max) {
            container.classList.add('valid');
            container.classList.remove('invalid');
         } else {
            container.classList.remove('valid');
            container.classList.add('invalid');
         }
      }
   }
   // Check validation
   payNowCheckValidation();
}

// PayNow - Pay button
function payNowCheckValidation() {
   let section = document.querySelector('.pay-now-container'),
       activePayment = section.querySelector('.payment-box.active'),
       formContent = section.querySelector('.form-content').children,
       btn = section.querySelector('.pay-btn .paynow-btn'),
       counter = 0;
   if (activePayment.classList.contains('form-check')) {
      for (let i = 0; i < formContent.length; i++) {
         if (formContent[i].classList.contains('valid')) {
            counter++;
         }
      }
      if (counter === formContent.length) {
         btn.classList.remove('disabled');
      } else {
         btn.classList.add('disabled');
      }
   } else {
      btn.classList.remove('disabled');
   }
}

// Chat Box - hide placeholder on type
function chatBoxPlcHolder() {
   let container = this.parentElement;
   if (this.value === '') {
      container.classList.remove('active');
   } else if (!container.classList.contains('active')) {
      container.classList.add('active');
   }
}

// Chat Box - messages Scroll
function chatBoxMsgScroll(ele) {
   let   chatContainer = ele.querySelector('.messages-container'),
         innerChat = chatContainer.querySelector('.inner-messages');
   if (innerChat.offsetHeight > chatContainer.offsetHeight) {
      chatContainer.scrollTop = (innerChat.offsetHeight - chatContainer.offsetHeight) + 25;
   }
}

// Chat Box - Display
function chatBoxDisplay(status, obj) {
   let ele = document.querySelector('.chatbox-container');
   if (status) {
      if (!ele.classList.contains('active')) {
         ele.classList.add('active');
         if (obj !== null) {
            chatBoxSendMsg(false, obj);
         }
         chatBoxMsgScroll(ele);
      }
   } else {
      if (ele.classList.contains('active')) {
         ele.classList.add('active2');
         ele.classList.remove('active');
         setTimeout(function() {
            ele.classList.remove('active2');
            // chec for product tag then remove it
            if (ele.querySelector('.chat-inner-content.active')) {
               chatBoxDeleteProTag();
            }
         }, 650);
      }
   }
}

// Chat box - Send Message
function chatBoxSendMsg(status, obj) {
   let container = document.querySelector('.chatbox-container.active'),
       innerContent = container.querySelector('.chat-inner-content'),
       msgContainer = container.querySelector('.inner-messages'),
       input = container.querySelector('#chat-txtbox');
   if (status) {
      if (input.value.trim() !== '') {
         let div = document.createElement('div');
         div.innerHTML = '<div class="msg-bubble">' + input.value + '</div>';
         if (innerContent.classList.contains('active')) {
            let product = container.querySelector('.chat-inner-content > .product-info');
            div.className = 'send-msg active';
            div.insertAdjacentElement('afterbegin', product);
            innerContent.classList.remove('active');
         } else {
            div.className = 'send-msg';
         }
         msgContainer.appendChild(div);
         chatBoxMsgScroll(container);
         input.value = '';
         input.parentElement.classList.remove('active');
      }
   } else {
      let div = document.createElement('div');
      div.className = 'product-info d-flex align-items-center user-select-none';
      div.innerHTML = '<div class="chatbox-protag-close position-absolute"><i class="fas fa-times-circle"></i></div><div class="pic"><img class="img-fluid h-100" src="' + obj.pic.src + '"></div><div class="title">' + obj.name + '</div>';
      innerContent.classList.add('active');
      innerContent.appendChild(div);
      setTimeout(function() {
         chatBoxMsgScroll(container);
      }, 1000)
   }
}

// Chat box - delete product tag
function chatBoxDeleteProTag() {
   let container = document.querySelector('.chatbox-container'),
       innerContent = container.querySelector('.chat-inner-content'),
       product = container.querySelector('.chat-inner-content > .product-info');
   innerContent.classList.remove('active');
   product.remove();
}

// Page Loader
function pageLoaderFun() {
   let images = document.images,
       container = document.querySelector('.page-loader');
   for (let i = 0; i < images.length; i++) {
      if (images[i].complete) {
         globalObj.status.pageLoaderImagesCounter += 1;
      } else {
         globalObj.status.pageLoaderImagesCounter = 0;
         setTimeout(function() {
            pageLoaderFun();
         }, 100);
         break;
      }
      if (globalObj.status.pageLoaderImagesCounter === images.length) {
         container.classList.add('active');
         document.body.classList.add('active');
         setTimeout(function() {
            container.remove();
         }, 280);
      }
   }
}