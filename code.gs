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
  
  if(isMoonFull()) {
    // Fetch the user's data
    var userData = JSON.parse(UrlFetchApp.fetch("https://habitica.com/api/v3/user", params));
    Utilities.sleep(3000);
    
    // Check if user owns werewolf outfit. If so, equip it!
    if(userData.data.items.gear.owned.head_mystery_201509 && userData.data.items.gear.owned.armor_mystery_201509) {
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

// Fetch the current moon phase from the good folks at the U.S. Naval Observatory, or calc it ourselves
function isMoonFull() {
  // First we need today's date
  var today = new Date();
  var year = today.getYear();
  var month = today.getMonth();
  var date = today.getDate();

  // The formatting of the date for the API call we're going to make differs from the response, and we need both...
  var askDate = month + 1 + "/" + date + "/" + year;  

  if(date < 10)
    date = "0" + date; // replydate date has two digits!

  var replyDate = year + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month] + " " + date;

  // Now here comes trouble. The API sometimes throws a DNS error, so we need a back-up method to calc moon phase. Problem is, it is not 100% accurate... OH WELL.
  try {
    var moonPhase = JSON.parse(UrlFetchApp.fetch("https://api.usno.navy.mil/moon/phase?date=" + askDate + "&nump=1"));
    return moonPhase.phasedata[0].phase == "Full Moon" && moonPhase.phasedata[0].date == replyDate ? true : false;
  }
  catch(e) {
    // This method is accurate to -1/+1 day, as far as I can tell.
    // Totally ripped off from http://www.ben-daglish.net/moon.shtml (R.I.P. dude)
    var lp = 2551443;
    var now = new Date(year, month - 1, date, 20, 35, 0);
    var new_moon = new Date(1970, 0, 7, 20, 35, 0);
    var phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
    var x = Math.floor(phase / (24 * 3600)) + 1;
    return x == 15 ? true : false;
  }
}
