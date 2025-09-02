import reflex as rx

config = rx.Config(
    app_name="ClasesTotoNoam",
    plugins=[
        rx.plugins.SitemapPlugin(),
        rx.plugins.TailwindV4Plugin(),
    ]
)