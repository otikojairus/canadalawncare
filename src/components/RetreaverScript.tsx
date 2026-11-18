import Script from "next/script";

const RETREAVER_BOOTSTRAP = `(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.defer=!0;a.src=document.location.protocol+"//dist.routingapi.com/jsapi/v1/retreaver.min.js";a.onload=a.onreadystatechange=function(){Retreaver.configure({host:"api.routingapi.com",prefix:"https:"==document.location.protocol?"https":"http"});(new Retreaver.Campaign({campaign_key:"61bb5feaf11dced8a51529c3fa06c6ff"})).auto_replace_numbers()};(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)})();`;

export function RetreaverScript() {
  return (
    <Script
      id="retreaver-bootstrap"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: RETREAVER_BOOTSTRAP }}
    />
  );
}