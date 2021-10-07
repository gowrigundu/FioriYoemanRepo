sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/integration/widgets/Card","sap/ui/model/json/JSONModel"
], function(Controller,Card,JSONMOdel) {
	"use strict";

	return Controller.extend("gowri.app.controller.Empty", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gowri.app.view.Empty
		 */
			onInit: function() {
				this.jModel = new JSONMOdel("https://corona.lmao.ninja/v2/jhucsse");
			},
			
		convertToIndex : function(aData){
			
			var groupedData = {};
            aData.forEach(element => {
				if(groupedData[element.country]){
					groupedData[element.country]  = {
						
						"country" : element.country,
						"confirmed" : element.stats.confirmed + groupedData[element.country].confirmed,
						"deaths" : element.stats.deaths + groupedData[element.country].deaths,
						"states" : 1 + groupedData[element.country].states
   					}                     
				}else{
					var country = element.country
					groupedData[country]  = {
						"country" : element.country,
						"confirmed" : element.stats.confirmed,
						"deaths": element.stats.deaths,
						"states" : 1
					}
				}

			});

			return groupedData;

		},

		onSearch: function(oEvent){
		  this.serachValue = oEvent.getParameter("query");
		  
		  var oList = this.getView().byId("id_select");
		  var oItem = oList.getSelectedItem();
		  this.onChange();
		},

		onChange: function(oEvent){

			debugger;
			var cardType = oEvent.getParameter("selectedItem").getKey();
			
			var jData = this.jModel.getData();
			debugger;
			var keyData = this.convertToIndex(jData);

			var tabData = [];
            Object.keys(keyData).map(function(key){
				tabData.push(keyData[key]);
			}); 

			
			var oVBox = this.getView().byId("id_vbox");
			var oCard = new Card();

			switch (cardType) {
				case "IndiaData":
					oCard.setManifest(
						{
						"sap.card": {
						  "type": "Object",
						  "data": {
							"json": keyData["India"]
						  },
						  "header": {
							"icon": {
							  "src": "{photo}"
							},
							"title": "India",
							"subTitle": "Covid Cases in India"
						  },
						  "content": {
							"groups": [
							  {
								"title": "Covid Cases",
								"items": [
								  {
									"label": "Country",
									"value": "{country}"
								  },
								  {
									"label": "Confirmed cases",
									"value": "{confirmed}"
								  },
								  {
									"label": "Deaths",
									"value": "{deaths}",
									"actions": [
									  {
										"type": "Navigation",
										"parameters": {
										  "url": "tel:{phone}"
										}
									  }
									]
								  },
								  {
									"label": "No of states",
									"value": "{states}",
									"actions": [
									  {
										"type": "Navigation",
										"parameters": {
										  "url": "mailto:{email}"
										}
									  }
									]
								  }
								]
							  },
							  {
								"title": "Company Details",
								"items": [
								  {
									"label": "Company Name",
									"value": "{company/name}"
								  },
								  {
									"label": "Address",
									"value": "{company/address}"
								  },
								  {
									"label": "Email",
									"value": "{company/email}",
									"actions": [
									  {
										"type": "Navigation",
										"parameters": {
										  "url": "mailto:{company/email}?subject={company/emailSubject}"
										}
									  }
									]
								  },
								  {
									"label": "Website",
									"value": "{company/website}",
									"actions": [
									  {
										"type": "Navigation",
										"parameters": {
										  "url": "{company/url}"
										}
									  }
									]
								  }
								]
							  },
							  {
								"title": "Organizational Details",
								"items": [
								  {
									"label": "Direct Manager",
									"value": "{manager/firstName} {manager/lastName}",
									"icon": {
									  "src": "{manager/photo}"
									}
								  }
								]
							  }
							]
						  }
						}
					  }
					  );					
					break;
				case "AllCountries":
				
					break;
				case "RecoveryData":
			
					break;
				case "Analytics":
		
					break;
			
				default:
					break;
			}
			
			oVBox.removeItem(0);
			oVBox.addItem(oCard);

		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf gowri.app.view.Empty
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf gowri.app.view.Empty
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf gowri.app.view.Empty
		 */
		//	onExit: function() {
		//
		//	}

	});

});