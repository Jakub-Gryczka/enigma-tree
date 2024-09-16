class LogInPage {
  private initLoginPage(): void {
    return document.body.insertAdjacentHTML(
      "afterbegin",
      `
          <svg class="flag flag__pl">
            <use xlink:href="./assets/flags/flag_pl.svg"></use>
          </svg>
          <svg class="flag flag__uk">
            <use xlink:href="./assets/flags/flag_uk.svg"></use>
          </svg>
        </div>
        <div class="container">
          <form action="#" class="login__form">
            <h1 class="h1" data-translate-key="title"></h1>
            <div class="form__row">
              <label for="form__email" data-translate-key="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="form__email"
                class="form__email"
              />
            </div>
            <div class="form__row">
              <label for="form__password" data-translate-key="password">Password</label>
              <input
                type="password"
                name="password"
                id="form__password"
                class="form__password"
              />
            </div>
            <button class="btn login__btn" data-translate-key="login__btn">
              Submit
            </button>
          </form>
        `
    );
  }
  constructor() {
    this.initLoginPage();
  }
}

export default LogInPage;
