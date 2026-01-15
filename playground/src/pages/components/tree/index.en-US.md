---
category: Components
group: Data Display
title: Tree
description: Multiple-level structure list.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*zYIWT52S4UMAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_9MMRpWoOcYAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

<DocHeading></DocHeading>

## When To Use {#when-to-use}

Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc. The `Tree` component is a way of representing the hierarchical relationship between these things. You can also expand, collapse, and select a treeNode within a `Tree`.

## Examples {#examples}

<demo-group>
  <demo src="./demo/basic.vue">Basic</demo>
  <demo src="./demo/basic-controlled.vue">Controlled Tree</demo>
  <demo src="./demo/draggable.vue">draggable</demo>
  <demo src="./demo/dynamic.vue">load data asynchronously</demo>
  <demo src="./demo/search.vue">Searchable</demo>
  <demo src="./demo/line.vue">Tree with line</demo>
  <demo src="./demo/customized-icon.vue">Customize Icon</demo>
  <demo src="./demo/directory.vue">directory</demo>
  <demo src="./demo/switcher-icon.vue">Customize collapse/expand icon</demo>
  <demo src="./demo/virtual-scroll.vue">Virtual scroll</demo>
  <demo src="./demo/block-node.vue">Block Node</demo>
  <demo src="./demo/big-data.vue" debug>Big data</demo>
  <demo src="./demo/multiple-line.vue" debug>Multiple lines</demo>
  <demo src="./demo/style-class.vue">Custom semantic dom styling</demo>
</demo-group>

## API

### Tree props {#tree-props}

Common props ref：[Common props](/docs/vue/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowDrop | Whether to allow dropping on the node | (&#123; dropNode, dropPosition &#125;) =&gt; boolean | - | - |
| autoExpandParent | Whether to automatically expand a parent treeNode | boolean | false | - |
| blockNode | Whether treeNode fill remaining horizontal space | boolean | false | - |
| checkable | Add a Checkbox before the treeNodes | boolean | false | - |
| checkedKeys | (Controlled) Specifies the keys of the checked treeNodes | Key[] \| &#123; checked: Key[], halfChecked: Key[] &#125; | [] | - |
| checkStrictly | Check treeNode precisely; parent treeNode and children treeNodes are not associated | boolean | false | - |
| classes | Customize class for each semantic structure inside the component. Supports object or function. | TreeClassNamesType | - | - |
| defaultCheckedKeys | Specifies the keys of the default checked treeNodes | Key[] | [] | - |
| defaultExpandAll | Whether to expand all treeNodes by default | boolean | false | - |
| defaultExpandedKeys | Specify the keys of the default expanded treeNodes | Key[] | [] | - |
| defaultExpandParent | If auto expand parent treeNodes when init | boolean | true | - |
| defaultSelectedKeys | Specifies the keys of the default selected treeNodes | Key[] | [] | - |
| disabled | Whether the tree is disabled | boolean | false | - |
| draggable | Specifies whether this Tree or the node is draggable. Use `icon: false` to disable drag handler icon | boolean \| ((node: DataNode) =&gt; boolean) \| &#123; icon?: VueNode \| false, nodeDraggable?: (node: DataNode) =&gt; boolean &#125; | false | - |
| expandedKeys | (Controlled) Specifies the keys of the expanded treeNodes | Key[] | [] | - |
| fieldNames | Customize node title, key, children field name | &#123; title?: string, key?: string, children?: string &#125; | &#123; title: 'title', key: 'key', children: 'children' &#125; | - |
| filterAntTreeNode | Defines a function to filter (highlight) treeNodes | (node: AntTreeNode) =&gt; boolean | - | - |
| height | Config virtual scroll height | number | - | - |
| icon | Insert a custom icon before the title. Need to set `showIcon` to true | VueNode \| ((props: AntTreeNodeProps) =&gt; VueNode) | - | - |
| loadData | Load data asynchronously | (node: DataNode) =&gt; Promise&lt;void&gt; | - | - |
| loadedKeys | (Controlled) Set loaded tree nodes. Need to work with `loadData` | Key[] | [] | - |
| motion | Custom motion config for the tree | CSSMotionProps | - | - |
| multiple | Allows selecting multiple treeNodes | boolean | false | - |
| rootClass | Root container class | string | - | - |
| selectable | Whether it can be selected | boolean | true | - |
| selectedKeys | (Controlled) Specifies the keys of the selected treeNodes | Key[] | - | - |
| showIcon | Controls whether to display the `icon` node | boolean | false | - |
| showLine | Shows a connecting line | boolean \| &#123; showLeafIcon: boolean \| TreeLeafIcon &#125; | false | - |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | TreeStylesType | - | - |
| switcherIcon | Customize expand/collapse icons for tree nodes | SwitcherIcon | - | - |
| switcherLoadingIcon | Customize loading icons for tree nodes | VueNode | - | - |
| titleRender | Customize tree node title render | (nodeData: DataNode) =&gt; VueNode | - | - |
| treeData | The treeNodes data Array | DataNode[] | - | - |
| virtual | Disable virtual scroll when set to false | boolean | true | - |
| tabindex | Set `tabindex` of tree | number | - | - |

### TreeNode props {#treenode-props}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checkable | When Tree is checkable, set TreeNode display Checkbox or not | boolean | - | - |
| disableCheckbox | Disables the checkbox of the treeNode | boolean | false | - |
| disabled | Disables the treeNode | boolean | false | - |
| icon | Customize icon | VueNode \| ((props: AntTreeNodeProps) =&gt; VueNode) | - | - |
| isLeaf | Determines if this is a leaf node (effective when `loadData` is specified) | boolean | - | - |
| key | Key of the treeNode | Key | - | - |
| selectable | Set whether the treeNode can be selected | boolean | true | - |
| title | Title | VueNode \| ((data: DataNode) =&gt; VueNode) | `---` | - |

### DirectoryTree props {#directorytree-props}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| expandAction | Directory opening logic, options: false \| `click` \| `doubleClick` | ExpandAction | `click` | - |

### Events {#events}

| Event | Description | Type | Version |
| --- | --- | --- | --- |
| click | Callback when tree node is clicked | NonNullable&lt;VcTreeProps['onClick']&gt; | - |
| check | Callback when tree node is checked | NonNullable&lt;VcTreeProps['onCheck']&gt; | - |
| expand | Callback when tree node is expanded or collapsed | NonNullable&lt;VcTreeProps['onExpand']&gt; | - |
| select | Callback when tree node is selected | NonNullable&lt;VcTreeProps['onSelect']&gt; | - |
| blur | Callback when tree loses focus | NonNullable&lt;VcTreeProps['onBlur']&gt; | - |
| focus | Callback when tree gains focus | NonNullable&lt;VcTreeProps['onFocus']&gt; | - |
| rightClick | Callback when the user right clicks a treeNode | NonNullable&lt;VcTreeProps['onRightClick']&gt; | - |
| dblclick | Callback when tree node is double clicked | NonNullable&lt;VcTreeProps['onDoubleClick']&gt; | - |
| doubleClick | Callback when tree node is double clicked | NonNullable&lt;VcTreeProps['onDoubleClick']&gt; | - |
| contextmenu | Callback when context menu is opened | NonNullable&lt;VcTreeProps['onContextMenu']&gt; | - |
| dragstart | Callback when dragging starts | NonNullable&lt;VcTreeProps['onDragStart']&gt; | - |
| dragenter | Callback when dragging enters a node | NonNullable&lt;VcTreeProps['onDragEnter']&gt; | - |
| dragover | Callback when dragging over a node | NonNullable&lt;VcTreeProps['onDragOver']&gt; | - |
| dragleave | Callback when dragging leaves a node | NonNullable&lt;VcTreeProps['onDragLeave']&gt; | - |
| drop | Callback when dropping on a node | NonNullable&lt;VcTreeProps['onDrop']&gt; | - |
| dragend | Callback when dragging ends | NonNullable&lt;VcTreeProps['onDragEnd']&gt; | - |
| load | Callback when a tree node is loaded | NonNullable&lt;VcTreeProps['onLoad']&gt; | - |
| mouseleave | Callback when mouse leaves | NonNullable&lt;VcTreeProps['onMouseLeave']&gt; | - |
| mouseenter | Callback when mouse enters | NonNullable&lt;VcTreeProps['onMouseEnter']&gt; | - |
| scroll | Callback when tree scrolls | NonNullable&lt;VcTreeProps['onScroll']&gt; | - |
| activeChange | Callback when active node changes | NonNullable&lt;VcTreeProps['onActiveChange']&gt; | - |
| update:expandedKeys | Emit when `expandedKeys` changes | (keys: Key[]) =&gt; void | - |
| update:checkedKeys | Emit when `checkedKeys` changes | (keys: Key[] \| &#123; checked: Key[], halfChecked: Key[] &#125;) =&gt; void | - |
| update:selectedKeys | Emit when `selectedKeys` changes | (keys: Key[]) =&gt; void | - |
| update:activeKey | Emit when active key changes | (key: Key) =&gt; void | - |

### Slots {#slots}

| Slot | Description | Type | Version |
| --- | --- | --- | --- |
| switcherLoadingIcon | Customize loading icons for tree nodes | () =&gt; any | - |
| switcherIcon | Customize expand/collapse icons for tree nodes | (props: AntTreeNodeProps) =&gt; any | - |
| draggableIcon | Custom draggable icon | () =&gt; any | - |
| icon | Insert a custom icon before the title | (props: AntdTreeNodeAttribute) =&gt; any | - |
| titleRender | Customize tree node title render | VcTreeProps['titleRender'] | - |

### Methods {#methods}

| Name | Description |
| --- | --- |
| scrollTo(&#123; key: Key, align?: 'top' \| 'bottom' \| 'auto', offset?: number &#125;) | Scroll to key item in virtual scroll |

## Semantic DOM {#semantic-dom}

| Name | Description |
| --- | --- |
| root | Root element |
| item | Tree node item |
| itemIcon | Tree node icon |
| itemTitle | Tree node title |

## Design Token {#design-token}

<ComponentTokenTable component="Tree"></ComponentTokenTable>

## FAQ

### Why defaultExpandAll not working on ajax data? {#faq-default-expand-all}

`default` prefix props only work when initializing. So `defaultExpandAll` has already been executed when ajax loads data. You can control `expandedKeys` or render the Tree when data is loaded to realize expanding all nodes.

### Virtual scroll limitation {#faq-virtual-scroll-limitation}

Virtual scroll only render items in visible region. Thus not support auto width (like long `title` with horizontal scroll).

### What does `disabled` node work logic in the tree? {#faq-disabled-node}

Tree change its data by conduction. Includes checked or auto expanded, it will conduction state to parent / children node until current node is `disabled`. So if a controlled node is `disabled`, it will only modify self state and not affect other nodes. For example, a parent node contains 3 child nodes and one of them is `disabled`. When check the parent node, it will only check rest 2 child nodes. As the same, when check these 2 child node, parent will be checked whatever checked state the `disabled` one is.

This conduction logic prevents modifying `disabled` parent checked state by checking children nodes, and users cannot modify directly with click which avoids interactive conflicts. If you want to modify this conduction logic, you can customize it with the `checkStrictly` prop.
