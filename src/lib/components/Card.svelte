<script
  lang='ts'>
  import type { Snippet } from 'svelte'

  interface Props {
    action?: Snippet
    children?: Snippet
    color?: string
    content?: Snippet
    icon?: Snippet
  }

  let { action, children, color = '#ffffff', content, icon }: Props = $props()
</script>

<article
  class='card'
  style='background-color: {color}'>
  
  {#if icon}
    <div
      class='card-icon-container'>
      {@render icon()}
    </div>
  {/if}

  {#if content}
    <div
      class='card-content'>
      {@render content()}
    </div>
  {/if}

  {#if action}
    <div
      class='card-actions'>
      {@render action()}
    </div>
  {/if}

  {#if children}
    {@render children()}
  {/if}
</article>
