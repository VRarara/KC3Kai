(function(){
	"use strict";
	
	KC3StrategyTabs.crafts = new KC3StrategyTab("crafts");
	
	KC3StrategyTabs.crafts.definition = {
		tabSelf: KC3StrategyTabs.crafts,
		
		/* INIT
		Prepares all data needed
		---------------------------------*/
		init :function(){
			
		},
		
		/* EXECUTE
		Places data onto the interface
		---------------------------------*/
		execute :function(){
			var self = this;
			// Get pagination
			KC3Database.count_devmt(function(NumRecords){
				var itemsPerPage = 25;
				var numPages = Math.ceil(NumRecords/itemsPerPage);
				
				var pageCtr, pageBox;
				for(pageCtr=0; pageCtr<numPages; pageCtr++){
					pageBox = $(".tab_crafts .factory .build_page").clone().appendTo(".tab_crafts .build_pages");
					pageBox.text(pageCtr+1);
				}
				$("<div>").addClass("clear").appendTo(".tab_crafts .build_pages");
				
				$(".tab_crafts .build_pages .build_page").on("click", function(){
					$(".tab_crafts .build_page").removeClass("active");
					$(this).addClass("active");
					self.tabSelf.definition.showPage( $(this).text() );
				});
				
				$(".tab_crafts .build_pages .build_page").first().trigger("click");
			});
		},
		
		showPage :function(pageNumber){
			KC3Database.get_devmt(pageNumber, function(response){
				$(".tab_crafts .build_list").html("")
				
				var ctr, thisBuild, buildbox, MasterItem;
				for(ctr in response){
					thisBuild = response[ctr];
					
					buildbox = $(".tab_crafts .factory .build_item").clone().appendTo(".tab_crafts .build_list");
					
					$(".build_id", buildbox).text( thisBuild.id );
					$(".build_ficon img", buildbox).attr("src", KC3Meta.shipIcon(thisBuild.flag) );
					$(".build_flag", buildbox).text( KC3Meta.shipName( KC3Master.ship(thisBuild.flag).api_name ) );
					
					$(".build_rsc1", buildbox).text( thisBuild.rsc1 );
					$(".build_rsc2", buildbox).text( thisBuild.rsc2 );
					$(".build_rsc3", buildbox).text( thisBuild.rsc3 );
					$(".build_rsc4", buildbox).text( thisBuild.rsc4 );
					
					if(thisBuild.result > -1){
						MasterItem = KC3Master.slotitem(thisBuild.result);
						$(".build_ricon img", buildbox).attr("src", "../../assets/img/items/"+MasterItem.api_type[3]+".png");
						$(".build_result", buildbox).text( KC3Meta.gearName( MasterItem.api_name ) );
					}else{
						$(".build_ricon img", buildbox).attr("src", "../../assets/img/client/penguin.png");
						$(".build_result", buildbox).text( "Penguin" );
					}
					
					$(".build_time", buildbox).text( new Date(thisBuild.time*1000).format("mmm dd, yy - hh:MM tt") );
					
				}
			});
		}
		
	};
	
})();