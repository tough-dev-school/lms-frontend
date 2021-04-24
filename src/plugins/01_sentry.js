import * as Sentry from "@sentry/vue";

export default ({ Vue }) => {
  if (process.env.NODE_ENV === "production") {
    Sentry.init({
      Vue,
      dsn: "https://ba238a6269f742aab98f715c334fbc36@o47144.ingest.sentry.io/5731954",
    });
  }
};
