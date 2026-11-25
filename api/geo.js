// Returns the visitor's city from Vercel's edge location headers.
// Used by the /get/* landing pages to say "Now booking in <city>".
module.exports = (req, res) => {
  const dec = (v) => { try { return decodeURIComponent(v || ''); } catch (e) { return v || ''; } };
  res.setHeader('Cache-Control', 'private, no-store');
  res.status(200).json({
    city: dec(req.headers['x-vercel-ip-city']),
    region: req.headers['x-vercel-ip-country-region'] || '',
    country: req.headers['x-vercel-ip-country'] || ''
  });
};
