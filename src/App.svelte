<script
  lang='ts'>
  import { onMount } from 'svelte'

  import { lang } from './lang'
  import Bundles from './lib/components/Bundles.svelte'
  import Footer from './lib/components/Footer.svelte'
  import Header from './lib/components/Header.svelte'
  import ProgressBar from './lib/components/ProgressBar.svelte'
  import { bundles } from './lib/stores/bundles'

  onMount(() => {
    void bundles.init()
  })

  const BASE_PROGRESS = 25
  const PROGRESS_PER_BUNDLE = 25

  let progress = $derived(
    BASE_PROGRESS +
    $bundles.filter(b => b.status === 'redeemed').length * PROGRESS_PER_BUNDLE
  )

  function handleRedeem(id: string, date: string) {
    void bundles.redeemBundle(id, date)
  }
</script>

<style>
  :global(.card-actions) {
    position: relative;
    isolation: isolate;
  }

  :global(.card-actions:has(.bundle-redeem-button[aria-label^="Redeem"]) .sr-only) {
    position: absolute;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    opacity: 0;
    z-index: 10;
    display: block !important;
    clip: auto !important;
    margin: 0 !important;
    cursor: pointer;
  }
</style>

<svelte:head>
  <title>{lang.title}</title>
</svelte:head>

<main
  class='app-main'>
  <Header />
  <ProgressBar
    {progress} />

  <section
    class='bundles-section'>
    <h2
      class='section-title'>{lang.bundles.sectionTitle}</h2>
    {#each $bundles as bundle (bundle.id)}
      <Bundles
        {bundle}
        onRedeem={handleRedeem} />
    {/each}
  </section>

  <Footer />
</main>
