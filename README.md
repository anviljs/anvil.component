# !DEPRECATED!

Given the divergence between bower and component and the impractical way that component behaves (see the whining section for details) component support is being removed from Anvil because no one I've talked to about the behavior actually wants component.

## Removed from NPM
I have unpublished this extension because I have no desire to try mitigating annoying or unhelpful aspects of component packages in the context of a build system. If you love component and would like to build your own extension, that'd be a nice way to support component and anvil users.

## Whining
  * putting -component at the end of package directories, it's under ./component, I think we get that it's a component package
  * placing a component.json at the root, I see no value here but it sure clutters things up
  * most packages I saw renamed the script to "index.js" - that's actually **very unhelpful**
  * packages are listed as odd names so users end up having to run a search to find them