import Script from "next/script";

export const HeadScripts = () => {
  return (
    <>
      {/* ga */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-03XPCRHM58"></Script>
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  `,
          }}
        ></Script>

        {/* clarity */}
        <Script
          id="ms_clarity"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "jendd3k7cz");`,
          }}
        ></Script>

        {/* google ads1 */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-460523677"></Script>
        <Script
          id="google_ad_cvr"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'AW-460523677');
          `,
          }}
        ></Script>

        {/* google ads2  */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-11405197042"></Script>
        <Script
          id="google_ad_cvr2"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'AW-11405197042');`,
          }}
        ></Script>

        {/* search */}
        <meta name="naver-site-verification" content="d5f89a80bfda39e51fe0210f70afc2ca8362a9e6" />
        <meta name="google-site-verification" content="-gTqVtTf_0bow-lLmzq1a_-CqhgreFLhNG8nl-sfqwo" />
    </>
  );
};
