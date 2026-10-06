import { config, fields, collection, singleton } from '@keystatic/core';

const ctaFields = () =>
  fields.object({
    label: fields.text({ label: 'Label' }),
    href: fields.text({ label: 'Href' }),
  });

const seoFields = () =>
  fields.object({
    metaTitle: fields.text({ label: 'Meta title' }),
    metaDescription: fields.text({
      label: 'Meta description',
      multiline: true,
    }),
    ogImage: fields.image({
      label: 'OG image',
      directory: 'public/images/seo',
      publicPath: '/images/seo',
    }),
  });

const indexPage = (label: string, path: string) =>
  singleton({
    label,
    path,
    format: { data: 'yaml' },
    schema: {
      eyebrow: fields.text({ label: 'Eyebrow' }),
      heading: fields.text({ label: 'Heading' }),
      intro: fields.text({ label: 'Intro', multiline: true }),
      emptyText: fields.text({ label: 'Empty state text' }),
    },
  });

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: {
          owner: 'TreGalloway',
          name: 'tre.comv2',
        },
        branchPrefix: 'keystatic/',
      }
    : {
        kind: 'local',
      },
  ui: {
    navigation: {
      Content: ['blog', 'work', 'uses', 'favorites'],
      Pages: [
        'home',
        'about',
        'contact',
        'notFound',
        'blogIndex',
        'workIndex',
        'usesIndex',
        'favoritesIndex',
      ],
      Settings: ['site', 'seo'],
    },
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          validation: { length: { max: 200 } },
        }),
        pubDate: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        category: fields.text({ label: 'Category', defaultValue: 'General' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (t) => t.value,
        }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'src/assets/images',
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        seo: seoFields(),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    work: collection({
      label: 'Work',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({
          label: 'Summary',
          validation: { length: { max: 160 } },
        }),
        role: fields.text({ label: 'Role' }),
        date: fields.date({ label: 'Date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (t) => t.value,
        }),
        cover: fields.image({
          label: 'Cover',
          directory: 'src/assets/images',
        }),
        url: fields.url({ label: 'Live URL' }),
        repo: fields.url({ label: 'Repo URL' }),
        liveLabel: fields.text({
          label: 'Live link label',
          defaultValue: 'Live site',
        }),
        codeLabel: fields.text({
          label: 'Code link label',
          defaultValue: 'View code',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        seo: seoFields(),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    uses: collection({
      label: 'Uses',
      slugField: 'title',
      path: 'src/content/uses/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({ label: 'Category' }),
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            description: fields.text({ label: 'Description' }),
          }),
          { label: 'Items', itemLabel: (i) => i.fields.name.value },
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    favorites: collection({
      label: 'Favorites',
      slugField: 'title',
      path: 'src/content/favorites/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({ label: 'Category' }),
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            description: fields.text({ label: 'Description' }),
            url: fields.url({ label: 'URL' }),
            featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
          }),
          { label: 'Items', itemLabel: (i) => i.fields.name.value },
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: 'Site',
      path: 'src/content/singletons/site/',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Site name' }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/site',
          publicPath: '/images/site',
        }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
        description: fields.text({ label: 'Description', multiline: true }),
        status: fields.text({ label: 'Status' }),
        url: fields.url({ label: 'Site URL' }),
        social: fields.object({
          twitter: fields.url({ label: 'Twitter' }),
          github: fields.url({ label: 'GitHub' }),
          linkedin: fields.url({ label: 'LinkedIn' }),
          email: fields.url({ label: 'Email' }),
          youtube: fields.url({ label: 'YouTube' }),
        }),
        nav: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Href' }),
            visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
          }),
          { label: 'Navigation', itemLabel: (i) => i.fields.label.value },
        ),
        footer: fields.object({
          copyrightName: fields.text({ label: 'Copyright name' }),
        }),
      },
    }),
    seo: singleton({
      label: 'SEO',
      path: 'src/content/singletons/seo/',
      format: { data: 'yaml' },
      schema: {
        titleTemplate: fields.text({
          label: 'Title template',
          description: 'Use %s as the placeholder for the page title.',
        }),
        defaultDescription: fields.text({
          label: 'Default description',
          multiline: true,
        }),
        defaultOgImage: fields.image({
          label: 'Default OG image',
          directory: 'public/images/seo',
          publicPath: '/images/seo',
        }),
        twitterHandle: fields.text({ label: 'Twitter handle' }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), {
          label: 'Keywords',
          itemLabel: (i) => i.value,
        }),
      },
    }),
    home: singleton({
      label: 'Home page',
      path: 'src/content/singletons/home/',
      format: { data: 'yaml' },
      schema: {
        hero: fields.object({
          eyebrow: fields.text({ label: 'Eyebrow' }),
          heading: fields.text({ label: 'Heading', multiline: true }),
          subheading: fields.text({ label: 'Subheading', multiline: true }),
          primaryCta: ctaFields(),
          secondaryCta: ctaFields(),
        }),
        postsSection: fields.object({
          eyebrow: fields.text({ label: 'Eyebrow' }),
          heading: fields.text({ label: 'Heading' }),
          ctaLabel: fields.text({ label: 'CTA label' }),
          ctaHref: fields.text({ label: 'CTA href' }),
          emptyText: fields.text({ label: 'Empty state text' }),
        }),
        workSection: fields.object({
          eyebrow: fields.text({ label: 'Eyebrow' }),
          heading: fields.text({ label: 'Heading' }),
          ctaLabel: fields.text({ label: 'CTA label' }),
          ctaHref: fields.text({ label: 'CTA href' }),
          emptyText: fields.text({ label: 'Empty state text' }),
        }),
      },
    }),
    about: singleton({
      label: 'About page',
      path: 'src/content/singletons/about/',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        heading: fields.text({ label: 'Heading' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        education: fields.object({
          heading: fields.text({ label: 'Heading' }),
          items: fields.array(
            fields.object({
              institution: fields.text({ label: 'Institution' }),
              detail: fields.text({ label: 'Detail', multiline: true }),
              status: fields.text({ label: 'Status' }),
            }),
            { label: 'Education', itemLabel: (i) => i.fields.institution.value },
          ),
        }),
        focusAreas: fields.object({
          heading: fields.text({ label: 'Heading' }),
          items: fields.array(
            fields.object({ label: fields.text({ label: 'Label' }) }),
            { label: 'Focus areas', itemLabel: (i) => i.fields.label.value },
          ),
        }),
        location: fields.object({
          heading: fields.text({ label: 'Heading' }),
          text: fields.text({ label: 'Text' }),
        }),
        cta: ctaFields(),
      },
    }),
    contact: singleton({
      label: 'Contact page',
      path: 'src/content/singletons/contact/',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        heading: fields.text({ label: 'Heading' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        cta: ctaFields(),
      },
    }),
    notFound: singleton({
      label: '404 page',
      path: 'src/content/singletons/not-found/',
      format: { data: 'yaml' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        heading: fields.text({ label: 'Heading' }),
        message: fields.text({ label: 'Message', multiline: true }),
        cta: ctaFields(),
      },
    }),
    blogIndex: indexPage('Blog page', 'src/content/singletons/blog-index/'),
    workIndex: indexPage('Work page', 'src/content/singletons/work-index/'),
    usesIndex: indexPage('Uses page', 'src/content/singletons/uses-index/'),
    favoritesIndex: indexPage(
      'Favorites page',
      'src/content/singletons/favorites-index/',
    ),
  },
});
