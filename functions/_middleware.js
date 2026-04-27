// Redirect www subdomain to apex domain with 301.
// Google Search Console reports the apex as canonical, so leaving www serving
// duplicate content fragments crawl budget and slows indexing. CF Pages
// _redirects is path-only and does not match on hostname, so the redirect
// has to happen at the Functions layer.
export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
};
