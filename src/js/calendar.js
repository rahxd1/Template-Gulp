// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '717528928253-3jnumt577rmvhsi8vbsol44ga3qlafc7.apps.googleusercontent.com';

// secreto de cliente
// bvaPDD1isl-3DWP8y-qjV5oE
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  //var authorizeDiv = document.getElementById('briefings');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    //authorizeDiv.style.display = 'none';
    loadCalendarApi();
  } //else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    //authorizeDiv.style.display = 'inline';
  //}
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 2,
    'orderBy': 'updated'
  });

  request.execute(function(resp) {
    var events = resp.items;
    //appendPre('Upcoming events:');
    console.log(events);
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        /*if (!when) {
          when = event.start.date;
        }*/
        //appendPre(event.summary + ' (' + when + ')')
        appendPre(event, i)
      }
    } else {
      //appendPre('No upcoming events found.');
      $('.no-briefings').show();
      $('#briefings article').hide();
    }

  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message, i) {
  //var pre = document.getElementById('output');
  //var textContent = document.createTextNode(message + '\n');
  //pre.appendChild(textContent);
  //console.log(message.start);
  var article = $('#briefings article')[i];
  var date_start = message.start.dateTime

  $(article).find('h4').text(moment(date_start).locale('es').format('MMMM D'));
  $(article).find('.date-session').text(moment(date_start).locale('es').format('dddd, D MMMM'));
  $(article).find('span').text(moment(date_start).locale('es').format('h:mm A'));
  $(article).find('.title-session').text(message.summary);

}
