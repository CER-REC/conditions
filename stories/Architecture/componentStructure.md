# Folder Structure

High-level documentation (like this architecture documentation) belongs in `./stories/`

## Components

Each component should have a folder in `./app/components/`, matching the name
and capitalization of the component. Each component should have its own supporting
documentation, examples, and tests.

```
/* Inside ./app/components/MyComponentName/
index.jsx // Component
styles.scss // Styles for CapitalizedComponent and children
index.test.jsx // Test for CapitalizedComponent
index.stories.jsx // Examples
README.md // Documentation
InternalComponent.jsx // Component used within CapitalizedComponent
InternalComponent.stories.jsx // Examples
InternalComponent.README.md // Documentation
InternalComponent.test.jsx // Test for InternalComponent
```
