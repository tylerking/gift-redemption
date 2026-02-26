<script
  lang='ts'>
  import type { Bundle } from '../stores/bundles'

  import { Popover } from 'bits-ui'
  import { lang } from '../../lang'
  import Card from './Card.svelte'

  interface Props {
    bundle: Bundle;
    onRedeem: (id: string, date: string) => void;
  }

  let { bundle, onRedeem }: Props = $props()
  let open = $state(false)

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

  function handleDateSelect(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.value) {
      onRedeem(bundle.id, target.value)
      open = false
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
    {#if bundle.status === 'available'}
      <Popover.Root bind:open>
        <Popover.Trigger
          class='bundle-redeem-button'>
          {buttonText}
        </Popover.Trigger>
        <Popover.Content
          class='date-picker-popover'>
          <input
            aria-label={`Select redemption date for ${bundle.title}`}
            class='date-picker-input'
            onchange={handleDateSelect}
            type='date'
          />
        </Popover.Content>
      </Popover.Root>
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
