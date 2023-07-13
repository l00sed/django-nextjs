from django.contrib.sitemaps import Sitemap

from articles.models import Article


class ArticleSitemap(Sitemap):
    changefreq = "monthly"

    def items(self):
        return Article.objects.all()


sitemaps = {
    'articles': ArticleSitemap
}
