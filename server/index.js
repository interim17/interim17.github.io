import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Header = () => {
  return /* @__PURE__ */ jsx("div", { className: "header", children: "interim17" });
};
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(Link, { to: "/lambroast", children: "Lamb Roast" })
  ] }) });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const SimpleRSVPForm = () => {
  const [name, setName] = useState("");
  const [rsvp, setRSVP] = useState("yes");
  const [dish, setDish] = useState("");
  const [feedback, setFeedback] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("Submitting...");
    const formBody = new URLSearchParams();
    formBody.append("name", name);
    formBody.append("rsvp", rsvp);
    formBody.append("dish", dish);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxAmzWj3NSzQpo2iIQVgd7NnGiG8wapRSCoy7kHuHPcUjvVKhUzCi5wqT99EP8r0fOOeA/exec",
        // Replace with your Apps Script Web App URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formBody.toString()
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const result = await response.text();
      setFeedback("RSVP submitted successfully!");
      setName("");
      setDish("");
    } catch (err) {
      setFeedback("Submission error: " + err.message);
    }
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      style: { maxWidth: "400px", margin: "20px auto" },
      children: [
        /* @__PURE__ */ jsx("div", { style: { marginBottom: "10px" }, children: /* @__PURE__ */ jsxs("label", { children: [
          "Name:",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              style: { marginLeft: "10px" }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { style: { marginBottom: "10px" }, children: /* @__PURE__ */ jsxs("label", { children: [
          "RSVP:",
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: rsvp,
              onChange: (e) => setRSVP(e.target.value),
              style: { marginLeft: "10px" },
              children: [
                /* @__PURE__ */ jsx("option", { value: "yes", children: "Yes" }),
                /* @__PURE__ */ jsx("option", { value: "maybe", children: "Maybe" }),
                /* @__PURE__ */ jsx("option", { value: "no", children: "No" })
              ]
            }
          )
        ] }) }),
        rsvp === "yes" && /* @__PURE__ */ jsx("div", { style: { marginBottom: "10px" }, children: /* @__PURE__ */ jsxs("label", { children: [
          "Dish you're bringing:",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: dish,
              onChange: (e) => setDish(e.target.value),
              style: { marginLeft: "10px" }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("button", { type: "submit", children: "Submit RSVP" }),
        feedback && /* @__PURE__ */ jsx("div", { style: { marginTop: "10px", fontStyle: "italic" }, children: feedback })
      ]
    }
  );
};
const LambRoast = () => {
  return /* @__PURE__ */ jsxs("div", {
    style: {
      padding: "20px"
    },
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        marginBottom: "10px"
      },
      children: "5/17 Housewarming Lamb Roast"
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        marginBottom: "20px"
      },
      children: [/* @__PURE__ */ jsx("div", {
        children: "Come for dinner, or hang around the yard all day, or both."
      }), /* @__PURE__ */ jsx("div", {
        children: " A few places to crash avaialable for out of towners."
      })]
    }), /* @__PURE__ */ jsx("div", {
      style: {
        marginBottom: "20px"
      },
      children: /* @__PURE__ */ jsx("div", {
        children: " RSVP "
      })
    }), /* @__PURE__ */ jsxs("div", {
      style: {
        marginBottom: "20px"
      },
      children: [/* @__PURE__ */ jsx("div", {
        children: " Schedule: "
      }), /* @__PURE__ */ jsx("div", {
        children: " 2pm - 7pm watching the spit turn and doing nothing "
      }), /* @__PURE__ */ jsx("div", {
        children: " 7pm - Late dinner in the yard "
      })]
    }), /* @__PURE__ */ jsx("div", {
      style: {
        marginBottom: "20px"
      },
      children: /* @__PURE__ */ jsx(SimpleRSVPForm, {})
    }), /* @__PURE__ */ jsx("div", {
      style: {
        marginBottom: "20px"
      },
      children: /* @__PURE__ */ jsxs("div", {
        children: [" ", "Not need to bring anything but if you want to, and you know what it is, feel free to add below so we can prevent duplicates:", " "]
      })
    })]
  });
};
const lambroast = withComponentProps(LambRoast);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lambroast
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CToAu__i.js", "imports": ["/assets/chunk-KNED5TY2-duzNQ3PX.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-D0Fi5u20.js", "imports": ["/assets/chunk-KNED5TY2-duzNQ3PX.js", "/assets/with-props-CB-udEvy.js"], "css": ["/assets/root-Bwj8ZKf2.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-r6mf4xsD.js", "imports": ["/assets/with-props-CB-udEvy.js", "/assets/chunk-KNED5TY2-duzNQ3PX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/lambroast": { "id": "pages/lambroast", "parentId": "root", "path": "lambroast", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/lambroast-CzI2MvbS.js", "imports": ["/assets/with-props-CB-udEvy.js", "/assets/chunk-KNED5TY2-duzNQ3PX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c2903e85.js", "version": "c2903e85", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "pages/lambroast": {
    id: "pages/lambroast",
    parentId: "root",
    path: "lambroast",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
