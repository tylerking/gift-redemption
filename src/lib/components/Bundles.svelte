<script
  lang='ts'>
  import type { Bundle } from '../stores/bundles'

  import { lang } from '../../lang'
  import Card from './Card.svelte'

  interface Props {
    bundle: Bundle;
    onRedeem: (id: string, date: string) => void;
  }

  let { bundle, onRedeem }: Props = $props()
  let dateInput: HTMLInputElement

  const isPending = $derived(bundle.status === 'pending')
  const buttonText = $derived(
    bundle.status === 'redeemed'
      ? lang.ui.buttons.complete
      : isPending
      ? lang.ui.buttons.pending
      : lang.ui.buttons.default
  )

  const formattedDate = $derived(
    bundle.redemptionDate 
      ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC', year: 'numeric' }).format(new Date(bundle.redemptionDate))
      : null
  )

  function handleRedeemClick() {
    if (bundle.status !== 'available') return
    dateInput.click()
  }

  function handleDateSelect(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.value) {
      onRedeem(bundle.id, target.value)
    }
  }
</script>

<Card
  color={bundle.color}>
  {#snippet icon()}
    <img
      alt={bundle.title}
      class='bundle-icon'
      src={bundle.icon}
    />
  {/snippet}

  {#snippet content()}
    <h2
      class='bundle-title'>{bundle.title}</h2>
    <ul
      class='bundle-items'>
      {#each bundle.items as item, i (i)}
        <li>{item}</li>
      {/each}
    </ul>
  {/snippet}

  {#snippet action()}
    <div
      class='bundle-price'>
      {lang.bundles.priceValue}
    </div>
    <button
      aria-label={bundle.status === 'redeemed' ? `${bundle.title} redeemed` : isPending ? `${bundle.title} pending` : `Redeem ${bundle.title}`}
      class='bundle-redeem-button'
      disabled={bundle.status !== 'available'}
      onclick={handleRedeemClick}
    >
      {buttonText}
    </button>
    {#if formattedDate && bundle.status !== 'available'}
      <div
        class='bundle-date'>{formattedDate}</div>
    {/if}
    <input
      aria-label={lang.ui.datePickerLabel}
      bind:this={dateInput}
      class='sr-only'
      onchange={handleDateSelect}
      type='date'
    />
  {/snippet}
</Card>
