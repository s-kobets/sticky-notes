// Обратимся к localStorage следующим образом
export default class Local {
	constructor(...props) {
		if (props.length > 0) {
			this.nameStorage = props[0];
		}
  }
  
  private urlGlobal?: string[] = null

  checkUrlGlobal() {
		if (!(this.urlGlobal instanceof Array)) {
			this.urlGlobal = [];
		}
  }
  
  checkName(name) {
		if (name) {
			return this.nameStorage = name;
		} else {
			return this.nameStorage = 'default';
		}
	}

  update(data) {
		this.checkUrlGlobal();
		let sObj = JSON.stringify(data);

		localStorage.setItem(this.nameStorage, sObj);
	}

  get(name) {
		let varLocalStorage;
		this.checkName(name);

		if (localStorage !== undefined) {
			varLocalStorage = JSON.parse(localStorage.getItem(this.nameStorage));
		}

		if (varLocalStorage !== undefined) {
			this.urlGlobal = varLocalStorage;
		}
		return this.urlGlobal;
	}

	nullStorage() {
		this.urlGlobal = [];
		this.add();
  }
}