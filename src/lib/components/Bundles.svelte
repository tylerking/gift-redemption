<script
  lang='ts'>
  import type { Bundle } from '../stores/bundles'

  import { lang } from '../../lang'
  import Card from './Card.svelte'
  import DatePicker from './DatePicker.svelte'

  interface Props {
    bundle: Bundle;
    onRedeem: (id: string, date: string) => void;
  }

  let { bundle, onRedeem }: Props = $props()

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

  function handleDateSelect(date: string) {
    onRedeem(bundle.id, date)
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
    {#if bundle.status === 'available'}
      <DatePicker
        {buttonText}
        onDateSelect={handleDateSelect} />
    {:else}
      <button
        class='bundle-redeem-button'
        disabled>
        {buttonText}
      </button>
    {/if}
    {#if formattedDate && bundle.status !== 'available'}
      <div
        class='bundle-date'>{formattedDate}</div>
    {/if}
  {/snippet}
</Card>
