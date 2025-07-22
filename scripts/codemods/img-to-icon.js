const path = require('path');

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Helper: build relative import path to components/icons/Icon
  const fileDir = path.dirname(fileInfo.path);
  let importPath = path.relative(fileDir, 'src/components/icons/Icon');
  if (!importPath.startsWith('.')) {
    importPath = './' + importPath;
  }
  importPath = importPath.replace(/\\/g, '/'); // windows -> posix
  // Remove possible extension
  importPath = importPath.replace(/\.tsx?$/, '');

  // Ensure import exists
  const ensureImport = () => {
    const hasImport = root.find(j.ImportDeclaration, {
      source: { value: importPath },
    }).size() > 0;

    if (!hasImport) {
      const importDecl = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('Icon'))],
        j.literal(importPath)
      );
      // insert after first import
      const firstImport = root.find(j.ImportDeclaration).at(0);
      if (firstImport.size() > 0) {
        firstImport.insertBefore(importDecl);
      } else {
        root.get().node.program.body.unshift(importDecl);
      }
    }
  };

  // Map width class => size prop
  const sizeMap = {
    'w-3': 'xs',
    'w-4': 'sm',
    'w-5': 'sm',
    'w-6': 'md',
    'w-8': 'lg',
    'w-12': 'xl',
  };

  let modified = false;

  root.find(j.JSXOpeningElement, { name: { name: 'img' } }).forEach((pathExp) => {
    const element = pathExp.node;
    const attributes = element.attributes || [];

    const srcAttr = attributes.find((a) => a.name && a.name.name === 'src');
    if (!srcAttr || srcAttr.value.type !== 'Literal') return;
    const srcVal = srcAttr.value.value;
    if (typeof srcVal !== 'string' || !srcVal.startsWith('/icons/')) return;

    const altAttr = attributes.find((a) => a.name && a.name.name === 'alt');
    const classAttr = attributes.find((a) => a.name && a.name.name === 'className');

    // Determine size from className tokens
    let sizeValue = null;
    let remainingClass = '';
    if (classAttr && classAttr.value && classAttr.value.type === 'Literal') {
      const tokens = classAttr.value.value.split(/\s+/);
      tokens.forEach((t) => {
        if (sizeMap[t]) {
          sizeValue = sizeMap[t];
        } else if (!/^h-/.test(t)) {
          // skip h-* as we'll rely on width mapping; otherwise keep
          remainingClass += `${t} `;
        }
      });
      remainingClass = remainingClass.trim();
    }

    // Build new Icon element attributes
    const newAttrs = [];
    newAttrs.push(j.jsxAttribute(j.jsxIdentifier('src'), j.literal(srcVal)));
    if (altAttr && altAttr.value.type === 'Literal') {
      newAttrs.push(j.jsxAttribute(j.jsxIdentifier('alt'), j.literal(altAttr.value.value)));
    } else {
      newAttrs.push(j.jsxAttribute(j.jsxIdentifier('alt'), j.literal('icon')));
    }
    if (sizeValue && sizeValue !== 'md') {
      newAttrs.push(j.jsxAttribute(j.jsxIdentifier('size'), j.literal(sizeValue)));
    }
    if (remainingClass) {
      newAttrs.push(j.jsxAttribute(j.jsxIdentifier('className'), j.literal(remainingClass)));
    }

    const selfClosing = j.jsxSelfClosingElement(j.jsxIdentifier('Icon'), newAttrs);

    // Replace both opening and closing; if original was self-closing, pathExp.parentPath will be JSXElement but maybe null.
    if (pathExp.parentPath.node.type === 'JSXElement') {
      // Replace entire element
      j(pathExp.parentPath).replaceWith(selfClosing);
    } else {
      // self-closing handled here
      j(pathExp).replaceWith(selfClosing);
    }

    modified = true;
  });

  if (modified) {
    ensureImport();
    return root.toSource({ quote: 'single' });
  }
  return null; // no changes
};

module.exports.parser = require('recast/parsers/typescript'); 