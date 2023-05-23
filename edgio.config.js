module.exports = {
  connector: '@edgio/starter',
  origins: [
    {
      name: "origin",
      override_host_header: "blog.inshorts.com",
      hosts: [
        {
          location: "blog.inshorts.com",
        },
      ],
      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: "test-origin.edgio.net",
      },
    },
  ],
};
