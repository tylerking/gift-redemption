<script
  lang='ts'>
  import { lang } from '../../lang'

  interface Props {
    progress: number;
  }

  let { progress }: Props = $props()

  const label = $derived(lang.progress.label.replace('{progress}', String(progress)))

  let colorScheme = $derived(
    progress < 50 ? { border: '#df9aa4', fill: '#f8d7da' } :
      progress < 75 ? { border: '#e5b078', fill: '#ffe8cc' } :
        progress < 100 ? { border: '#d1be75', fill: '#fff3cd' } :
        { border: '#a3ccaf', fill: '#d4edda' }
  )
</script>

<div
  class='progress-wrapper'>
  <div
    class='progress-label'>{label}</div>
  <div
    class='progress-bar'
    style='--progress-border: {colorScheme.border}'>
    <div
      class='progress-fill'
      style='width: {progress}%; --progress-fill: {colorScheme.fill}'></div>
  </div>
</div>
