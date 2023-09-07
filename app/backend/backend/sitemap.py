from django.contrib.sitemaps import Sitemap

from articles.models import Article


class ArticleSitemap(Sitemap):
    protocol = "https"
    changefreq = "monthly"

    def location(self, item):
        # Set a different change freq for "live" page
        if item.slug == "live":
            self.changefreq = "daily"
        return item.get_absolute_url()

    def items(self):
        return Article.objects.all()


class NoViewsSitemap(Sitemap):
    protocol = "https"
    changefreq = "never"

    def location(self, item):
        slugs = {
            "homepage": "/",
        }
        return slugs[item]

    def items(self):
        return [
            "homepage",
        ]


sitemaps = {
    "no_views": NoViewsSitemap,
    "articles": ArticleSitemap
}
