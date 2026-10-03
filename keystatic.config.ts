import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.KEYSTATIC_GITHUB_OWNER || 'TreGalloway',
      name: process.env.KEYSTATIC_GITHUB_REPO || 'kanagawa-blog',
    },
    branchPrefix: 'keystatic/',
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
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
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
          { label: 'Items', itemLabel: (i) => i.fields.name.value }
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
          { label: 'Items', itemLabel: (i) => i.fields.name.value }
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
