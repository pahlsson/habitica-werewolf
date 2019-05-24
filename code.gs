/*
Here a bunch of full moon dates for testing purposes
"2019-06-17", "2019-07-16", "2019-08-15", "2019-09-14", "2019-10-13", "2019-11-12", "2019-12-12", "2020-01-10", "2020-02-09", "2020-03-09",
"2020-04-08", "2020-05-07", "2020-06-05", "2020-07-05", "2020-08-03", "2020-09-02", "2020-10-01", "2020-10-31", "2020-11-30", "2020-12-30"
*/

function werewolf() {
  var habId = "";
  var habToken = "";
  
  var params = {
    "method" : "get",
    "headers" : {
      "x-client" : "410b09e8-b870-4e30-80ac-2c99e9fd9678-Werewolf",
      "x-api-user" : habId, 
      "x-api-key" : habToken
    }
  }
  
  // First we need today's date
  var today = new Date();
  var year = today.getYear();
  var month = today.getMonth();
  var date = today.getDate();
  
  // The formatting of the date for the API call we're going to make differs from the response, and we need both...
  var askDate = month + 1 + "/" + date + "/" + year;
  var replyDate = year + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month] + " " + date;
  
  // Now fetch the current moon phase from the good folks at the U.S. Naval Observatory
  var moonPhase = JSON.parse(UrlFetchApp.fetch("https://api.usno.navy.mil/moon/phase?date=" + askDate + "&nump=1"));
  
  // Check if today is full moon
  if(moonPhase.phasedata[0].phase == "Full Moon" && moonPhase.phasedata[0].date == replyDate) {
 
    // Fetch the user's data and check if user owns werewolf outfit. If so, equip it!
    var userData = JSON.parse(UrlFetchApp.fetch("https://habitica.com/api/v3/user", params));
    Utilities.sleep(3000);
    
    if(userData.data.items.gear.owned.head_mystery_201502 && userData.data.items.gear.owned.armor_mystery_201509) {
      params.method = "post";
      
      // Equip werewolf mask, if not already wearing it
      if(userData.data.items.gear.costume.head != "head_mystery_201509") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/head_mystery_201509", params);
        Utilities.sleep(3000);
      }
      
      // Equip werewolf suit, if not already wearing it
      if(userData.data.items.gear.costume.armor != "armor_mystery_201509") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/armor_mystery_201509", params);
        Utilities.sleep(3000);
      }
      
      // Un-equip everything else because werewoofs don't carry items
      if(userData.data.items.gear.costume.weapon != "weapon_base_0") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/" + userData.data.items.gear.costume.weapon, params);
        Utilities.sleep(3000);
      }
      if(userData.data.items.gear.costume.shield != "shield_base_0") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/" + userData.data.items.gear.costume.shield, params);
        Utilities.sleep(3000);
      }
      if(userData.data.items.gear.costume.eyewear != "eyewear_base_0") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/" + userData.data.items.gear.costume.eyewear, params);
        Utilities.sleep(3000);
      }
      if(userData.data.items.gear.costume.headAccessory != "headAccessory_base_0") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/" + userData.data.items.gear.costume.headAccessory, params);
        Utilities.sleep(3000);
      }
      if(userData.data.items.gear.costume.back != "back_base_0") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/" + userData.data.items.gear.costume.back, params);
        Utilities.sleep(3000);
      }
      if(userData.data.items.gear.costume.body != "body_base_0") {
        UrlFetchApp.fetch("https://habitica.com/api/v3/user/equip/costume/" + userData.data.items.gear.costume.body, params);
        Utilities.sleep(3000);
      }  
    } // End equippery 
  }
}
