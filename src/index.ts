
import { Cart } from './api/cart';
import { Orders } from './api/orders';
import { Resource } from './api/resource';
import { Places } from './api/places';
import { Template } from './api/template';
import { Location } from './helpers/location';
import { Customers } from './api/customers';
import { Item } from './helpers/item';
import { Money } from './helpers/money';

export interface InitConfig {
	userId: number;
	siteId: string;
	cmsSiteId?: string;
	cdnDomain: string;
	merchantId: string;
}

class SiteThemeSDK {
	version: string = '0.0.0-semantic-release';
	cart: Cart;
	orders: Orders;
	places: Places;
	resource: Resource;
	template: Template;
	customers: Customers;
	helpers: {
		item: Item;
		location: Location;
		money: Money;
	};

	constructor(initObj: InitConfig) {
		if (!initObj.userId) {
			throw new Error('missing user id');
		}
		if (!initObj.siteId) {
			throw new Error('missing site id');
		}
		if (!initObj.merchantId) {
			throw new Error('missing merchant id');
		}
		if (!Number.isInteger(Number(initObj.userId))) {
			throw new Error('invalid user id');
		}
		if (!Number.isInteger(Number(initObj.siteId))) {
			throw new Error('invalid site id');
		}
		this.cart = new Cart();
		this.orders = new Orders(initObj);
		this.places = new Places(initObj);
		this.resource = new Resource();
		this.template = new Template();
		this.customers = new Customers(initObj);
		this.helpers = {
			item: new Item(),
			location: new Location(),
			money: new Money()
		};
	}
}

export default SiteThemeSDK;
