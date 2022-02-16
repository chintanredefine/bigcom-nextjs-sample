const page = {
  id: 10,
  name: 'contact-us',
  is_visible: true,
  sort_order: 42,
  body: `
  <main class="page">
    <div class="contact-bannerouter">
        <a href="/customer-service.html"
           class="error-banner-img"
           title="error">
            <img class="lazyload"
                 data-sizes="auto"
                 src="https://cdn11.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/customer-service-page-a02.png?t=1594200558&_ga=2.196486053.882085373.1594111989-2120057080.1585724489"
                 title="faq"
                 alt="error">
        </a>
    </div>
    <div class="container">
        <div class="getintouchouter">
            <h2>Let's Get in Touch</h2>
            <div class="getintouchinner">
                <div class="sendemail">
                    <div class="sendemailimg">
                        <a href="#"
                           class="email-img"
                           title="error">
                            <img class="lazyload"
                                 data-sizes="auto"
                                 src="https://cdn11.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/eailupdateimg.png"
                                 title="error"
                                 alt="error">
                        </a>
                    </div>
                    <div class="sendemail-text">
                        <p>Send us and email</p>
                        <a href="mailto:info@sleekshop.com"
                           title="ContactUs">info@sleekshop.com</a>
                        <span>*Please allow 1 business </br>day for response</span>
                    </div>
                </div>

                <div class="sendemail">
                    <div class="sendemailimg">
                        <a href="#"
                           class="email-img"
                           title="error">
                            <img class="lazyload"
                                 data-sizes="auto"
                                 src="https://cdn11.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/ringupdateimg.png"
                                 title="error"
                                 alt="error">
                        </a>
                    </div>
                    <div class="sendemail-text">
                        <p>Give us a ring</p>
                        <a href="tel:1-800-921-4813">1-800-921-4813</a>
                        <span>*If line is busy, please leave a voicemail.</br>
                            We will call you back :)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="contact-bannerouter">
        <a href="#"
           class="error-banner-img"
           title="error">
            <img class="lazyload"
                 data-sizes="auto"
                 src="https://cdn11.bigcommerce.com/s-hmhnh4h9/product_images/uploaded_images/contactcurbside.png"
                 title="faq"
                 alt="error">
        </a>
    </div>


    <div class="container">
        <main class="page">
            <!--     <h1 class="page-heading">Contact Us</h1> -->


            <div id="contact-us-page"
                 class="page-content page-content--centered">
                <p>
                <div style="display: none;">&nbsp;Test1234</div>
                </p>
                <form data-contact-form
                      class="form"
                      action="/pages.php?action=sendContactForm"
                      method="post">


                    <input type="hidden"
                           name="page_id"
                           id="page_id"
                           value="4">
                    <div class="form-row form-row--half">
                        <div class="form-field">
                            <!-- <label class="form-label" for="contact_fullname">Full Name</label> -->
                            <input class="form-input"
                                   type="text"
                                   id="contact_fullname"
                                   placeholder="FULL NAME"
                                   name="contact_fullname"
                                   value="">
                        </div>

                        <div class="form-field">
                            <!-- <label class="form-label" for="contact_phone">Phone Number</label> -->
                            <input class="form-input"
                                   type="text"
                                   id="contact_phone"
                                   placeholder="PHONE"
                                   name="contact_phone"
                                   value="">
                        </div>

                        <div class="form-field">
                            <!-- <label class="form-label" for="contact_email">Email Address -->
                            <small>Required</small>
                            </label>
                            <input class="form-input"
                                   type="text"
                                   id="contact_email"
                                   placeholder="EMAIL"
                                   name="contact_email"
                                   value="">
                        </div>

                        <div class="form-field">
                            <!--<label class="form-label" for="contact_orderno">Order Number</label> -->
                            <input class="form-input"
                                   type="text"
                                   id="contact_orderno"
                                   placeholder="COMPANY"
                                   name="contact_orderno">
                        </div>


                    </div>

                    <div class="form-row form-row--full">
                        <div class="form-field">
                            <!-- <label class="form-label" for="contact_question">Comments/Questions
                      <small>Required</small>
                  </label> -->
                            <textarea name="contact_question"
                                      id="contact_question"
                                      placeholder="COMMENTS/QUESTIONS*"
                                      rows="5"
                                      cols="50"
                                      class="form-input"></textarea>
                        </div>



                        <div class="form-actions">
                            <input class="button button--primary"
                                   type="submit"
                                   value="Submit Form">
                        </div>
                </form>
            </div>
        </main>


    </div>


    <div id="modal"
         class="modal"
         data-reveal
         data-prevent-quick-search-close>
        <a href="#"
           class="modal-close"
           aria-label="Close"
           role="button">
            <span aria-hidden="true">&#215;</span>
        </a>
        <div class="modal-content"></div>
        <div class="loadingOverlay"></div>
    </div>
</main>
  `,
}

module.exports = page
