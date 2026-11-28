/* NOVO'S Cleaning: Google tracking (GA4 + Google Ads).
   Fill in the IDs below. Until they're filled in, this file does nothing.
   - GA4_ID:        Google Analytics > Admin > Data streams > your site > "Measurement ID" (starts with G-)
   - ADS_ID:        Google Ads > Goals > Conversions > your conversion > Tag setup > "Conversion ID" (starts with AW-)
   - ADS_LEAD_LABEL / ADS_CALL_LABEL: the "Conversion label" for each conversion action (the part after the slash)
*/
(function () {
  var GA4_ID = '';          // e.g. 'G-ABC123XYZ9'
  var ADS_ID = '';          // e.g. 'AW-123456789'
  var ADS_LEAD_LABEL = '';  // conversion label for "Quote form submitted"
  var ADS_CALL_LABEL = '';  // conversion label for "Phone number clicked"

  var on = !!(GA4_ID || ADS_ID);

  if (on) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (GA4_ID || ADS_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    if (GA4_ID) gtag('config', GA4_ID);
    if (ADS_ID) gtag('config', ADS_ID);
  }

  // Call this from anywhere: novosTrack('lead') or novosTrack('call')
  window.novosTrack = function (type) {
    try {
      if (type === 'call' && window.fbq) fbq('track', 'Contact');
      if (!on) return;
      if (type === 'lead') {
        if (GA4_ID) gtag('event', 'generate_lead', { method: 'quote_form' });
        if (ADS_ID && ADS_LEAD_LABEL) gtag('event', 'conversion', { send_to: ADS_ID + '/' + ADS_LEAD_LABEL });
      }
      if (type === 'call') {
        if (GA4_ID) gtag('event', 'phone_click', { page: location.pathname });
        if (ADS_ID && ADS_CALL_LABEL) gtag('event', 'conversion', { send_to: ADS_ID + '/' + ADS_CALL_LABEL });
      }
    } catch (e) {}
  };

  // Every "tel:" link on the site counts as a phone-click conversion.
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
    if (a) window.novosTrack('call');
  }, true);
})();
