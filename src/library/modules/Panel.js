/* Panel.js
KC3改 DevTools Panel

Must only be imported on devtools pages!
May contain multiple dashboards of different theme/layouts.
Manages multiple instances of \library\modules\Dashboard.js
*/
(function(){
	"use strict";
	
	window.KC3Panel = {
		state: "waiting",
		currentLayout: "",
		mode: "normal", // normal OR battle
		horizontal: {},
		vertical: {},
		
		init :function( callback ){
			try {
				// Check localStorage
				if(!window.localStorage){
					throw new Error("Your Chrome's localStorage is disabled on your settings. KC3改 needs this feature. <a href=\"http://stackoverflow.com/a/26671889/483704\" target=\"_blank\">See how to enable this</a>.");
				}
				
				// Initialize data managers
				ConfigManager.load();
				KC3Meta.init("../../../../data/");
				KC3Master.init();
				PlayerManager.init();
				KC3ShipManager.load();
				KC3GearManager.load();
				KC3Database.init();
				
				var fontFamily = "Arial";
				switch(ConfigManager.language){
					case "jp": fontFamily = "\"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif"; break;
					default: break;
				}
				$("body").css("font-family", fontFamily);
				
				callback(true);
			}catch(e){
				callback(false, e.message);
			}
		},
		
		// Apply user's customizations to panel
		applyCustomizations :function(element){
			// Apply interface configs
			if(ConfigManager.pan_bg_image == ""){
				element.css("background", ConfigManager.pan_bg_color);
			}else{
				element.css("background-image", "url("+ConfigManager.pan_bg_image+")");
				element.css("background-color", ConfigManager.pan_bg_color);
				element.css("background-size", ConfigManager.pan_bg_size);
				element.css("background-position", ConfigManager.pan_bg_position);
				element.css("background-repeat", "no-repeat");
			}
		},
		
		// Hide waiting message, and show the appropriate dashboard
		activateDashboard :function(){
			this.state = "running";
			this.detectOrientation();
		},
		
		// Detect layout based on window width
		detectOrientation :function(){
			if(this.state != "running"){ return false; }
			
			// Wide interface, switch to vertical if not yet
			if( $(window).width() >= 800 && this.currentLayout != "vertical" ){
				if(this.currentLayout!=""){ this.layout().hide(); }
				this.currentLayout = "vertical";
				this.layout().show();
				_gaq.push(['_trackEvent', "Layout: Vertical", 'clicked']);
				
			// Narrow interface, switch to horizontal if not yet
			}else if( $(window).width() < 800 && this.currentLayout != "horizontal" ){
				if(this.currentLayout!=""){ this.layout().hide(); }
				this.currentLayout = "horizontal";
				this.layout().show();
				_gaq.push(['_trackEvent', "Layout: Horizontal", 'clicked']);
			}
		},
		
		// Get the currently used layout
		layout :function(){
			return this[ this.currentLayout ];
		}
		
	};
	
})();