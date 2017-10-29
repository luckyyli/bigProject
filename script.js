qNum = 0;
aNum = 0;
// sweet > healthy > prep > hot
answers = {true: {true: {true: {true: "Healthy Pumpkin Cheesecake Muffin", false: "Vegan Pumpkin Pie Energy Bars"}, false: {true: "Hemp and Maple Pecan Oatmeal", false: "Banana Maple Yogurt Parfait"}},false: {true: {true: "Sweet Butter Cookies",false: "Macadamia Toffee Brittle"}, false: {true: "Godiva Hot Chocolate",false: "Aldi Mini Eclairs"}},}, false: {true: {true: {true: "Broccoli Cheese Bites", false: "Edimame Crostini With Pears"}, false: {true: "Pre-Made Soup", false: "Trader Joes Green Bean Chips"}}, false: {true: {true: "Bacon-Wrapped Little Smokies", false: "Italian Cold Cuts Roll-Up"}, false: {true: "Tostitos Creamy Spinach Dip with Chips", false: "Chips"}},},};

details = {"Healthy Pumpkin Cheesecake Muffin":"http://thebigmansworld.com/2014/11/21/healthy-pumpkin-cheesecake-muffins/", "Vegan Pumpkin Pie Energy Bars":"http://www.nutritionistinthekitch.com/vegan-pumpkin-pie-energy-bars-gluten-free-protein-addition-optional/", "Hemp and Maple Pecan Oatmeal":"http://www.nutritionistinthekitch.com/protein-packed-hemp-maple-pecan-oatmeal/","Banana Maple Yogurt Parfait":"http://www.lemontreedwelling.com/2015/01/banana-maple-yogurt-parfait.html", "Sweet Butter Cookies":"http://allrecipes.com/recipe/10290/sweet-butter-cookies/", "Macadamia Toffee Brittle":"http://www.tablespoon.com/recipes/macadamia-toffee-brittle/f65faec2-cc3b-43cd-ac19-680867bd5e4e", "Godiva Hot Chocolate":"http://www.godiva.com/milk-chocolate-hot-cocoa/77462.html", "Aldi Mini Eclairs":"https://www.aldi.us/en/grocery-home/aldi-brands/specially-selected/frozen-foods/frozen-detail/ps/p/specially-selected-mini-clairs/", "Broccoli Cheese Bites":"http://www.playpartyplan.com/broccoli-cheese-bites/", "Edimame Crostini With Pears":"http://www.eatyourselfskinny.com/edamame-pear-crostini-and-a-birthday/", "Trader Joes Green Bean Chips":"http://www.mytraderjoeslist.com/2011/10/lightly-salted-crunchy-green-beans.html", "Pre-Made Soup":"http://www.mensfitness.com/nutrition/what-to-eat/easy-healthy-meals-7-best-canned-soups", "Bacon-Wrapped Little Smokies":"http://www.tablespoon.com/recipes/bacon-wrapped-little-smokies/04109bb8-b28e-4dd1-819a-d5f4158d9103", "Tostitos Creamy Spinach Dip with Chips":"http://www.fritolay.com/snacks/product-page/dips-and-salsas/tostitos-creamy-spinach-dip", "Chips":"https://www.capecodchips.com/","Italian Cold Cuts Roll-Up":"http://www.tasteofhome.com/recipes/appetizer-roll-ups"}

photos = {"Healthy Pumpkin Cheesecake Muffin":"photos/pumpkin_Cheesecake_muffins3.jpg", "Vegan Pumpkin Pie Energy Bars":"photos/pumpkinPieProteinBars.jpg", "Hemp and Maple Pecan Oatmeal":"photos/Hemp_Maple_Pecan_Oatmeal.jpg", "Banana Maple Yogurt Parfait":"photos/Banana-Maple-Yogurt-Parfait-3b.jpg", "Sweet Butter Cookies":"photos/Butter-Cookies2.jpg", "Macadamia Toffee Brittle":"photos/toffee_brittle.jpg", "Godiva Hot Chocolate":"photos/hotChocolate.jpg", "Aldi Mini Eclairs":"photos/miniEclairs.jpg", "Broccoli Cheese Bites":"photos/broccoli-cheese-bites.jpg", "Edimame Crostini With Pears":"photos/edamamePearCrostini.jpg", "Trader Joes Green Bean Chips":"photos/green-beans1.jpg", "Pre-Made Soup":"photos/pacific-creamy-tomato-soup.jpg", "Bacon-Wrapped Little Smokies":"photos/bacon-wrapped-smokies.jpg", "Tostitos Creamy Spinach Dip with Chips":"photos/tostitos-dip-creamy-spinach.png", "Chips":"photos/capecod-potatochips.jpg", "Italian Cold Cuts Roll-Up":"photos/coldcuts-rollup.jpg"}


$(document).ready(function(){
   $("#start").click(start)
   $("#yes").click(function(){
      answer(true)
   })
   $("#no").click(function(){
      answer(false)
   })
   $("#results").click(function(){
      getResults();
   })
});


function start(){
   $("#loading").removeClass("hidden");
   $("#start").addClass("hidden");
   $("#yes").removeClass("hidden");
   $("#no").removeClass("hidden");
   answer();
}

function answer(ans){
   getQuestions();
	if(qNum>0){
	   saveAnswer(ans);
	}
}

function getQuestions(){
   $.get("questions.xml", function(data){
      var $q = $(data).find("q")
      $("#loading").addClass("hidden")
      if(qNum < $q.length){
         $("#question").html($q[qNum].firstChild.nodeValue)
      }
      else {
         $("#question").html("You've completed the quiz.<br>")
         $("#yes").addClass("hidden")
		 	$("#no").addClass("hidden")
         $("#start").addClass("hidden")
         $("#results").removeClass("hidden")
      }
      qNum += 1
   });
}

function saveAnswer(ans){
	console.log(answers);
   $.get("questions.xml", function(data){
      var $a = $(data).find("a")
      if (aNum < $a.length){
         $a[aNum].firstChild.nodeValue = ans
         answers = answers[ans]
			console.log(answers[ans])
      }
      aNum += 1
   });
}

function getResults(){
   //display answer
   $("#results").addClass("hidden");
   $("#details").removeClass("hidden");
	$("#question").html(answers);

	$("#snackImage").removeClass("hidden");
	$("#snackImage").attr("src", photos[answers]);
	$("#snackImage").attr("alt", answers);

	$("#details").attr("href",details[answers]);
}
