/* ShipManager.js
KC3改 Ship Manager

Managesship roster and does indexing for data access.
Saves and loads list to and from localStorage
*/
(function(){
	"use strict";
	
	window.KC3ShipManager = {
		list: {},
		max: 100,
		
		// Get a specific ship by ID
		get :function( rosterId ){
			// console.log("getting ship", rosterId, this.list["x"+rosterId]);
			return this.list["x"+rosterId] || (new KC3Ship());
		},
		
		// Count number of ships
		count :function(){
			return Object.size(this.list);
		},
		
		// Add or replace a ship on the list
		add :function(data){
			if(typeof data.api_id != "undefined"){
				this.list["x"+data.api_id] = new KC3Ship(data);
			}else if(typeof data.rosterId != "undefined"){
				this.list["x"+data.rosterId] = new KC3Ship(data);
			}
		},
		
		// Mass set multiple ships
		set :function(data){
			var ctr;
			for(ctr in data){
				if(!!data[ctr]){
					this.add(data[ctr]);
				}
			}
			this.save();
		},
		
		// Remove ship from the list, scrapped, mod-fodded, or sunk
		remove :function( rosterId ){
			console.log("removing ship", rosterId);
			var thisShip = this.list["x"+rosterId];
			if(thisShip != "undefined"){
				for(var gctr in thisShip.items){
					if(thisShip.items[gctr] > -1){
						KC3GearManager.remove( thisShip.items[gctr] );
					}
				}
				
				delete this.list["x"+rosterId];
				this.save();
				KC3GearManager.save();
			}
		},
		
		// Show JSON string of the list for debugging purposes
		json: function(){
			console.log(JSON.stringify(this.list));
		},
		
		// Save ship list onto local storage
		clear: function(){
			this.list = {};
		},
		
		// Save ship list onto local storage
		save: function(){
			localStorage.ships = JSON.stringify(this.list);
		},
		
		// Load from storage and add each one to manager list
		load: function(){
			if(typeof localStorage.ships != "undefined"){
				this.clear();
				var ShipList = JSON.parse(localStorage.ships);
				for(var ctr in ShipList){
					this.add( ShipList[ctr] );
				}
				return true;
			}
			return false;
		}
		
	};
	
})();