<script
  lang='ts'>
  import type { DateValue } from 'bits-ui'

  import { DatePicker as BitsDatePicker } from 'bits-ui'

  interface Props {
    buttonText: string;
    onDateSelect: (date: string) => void;
  }

  let { buttonText, onDateSelect }: Props = $props()
  let value = $state<DateValue | undefined>(undefined)

  function handleValueChange(newValue: DateValue | undefined) {
    if (newValue) {
      const isoDate = `${newValue.year}-${String(newValue.month).padStart(2, '0')}-${String(newValue.day).padStart(2, '0')}`
      onDateSelect(isoDate)
    }
  }
</script>

<BitsDatePicker.Root
  bind:value
  onValueChange={handleValueChange}>
  <BitsDatePicker.Input
    class='date-picker-input-wrapper'>
    {#snippet children({ segments })}
      {#each segments as { part, value }, i (part + i)}
        {#if part === 'literal'}
          <BitsDatePicker.Segment
            class='date-segment-literal'
            {part}>
            {value}
          </BitsDatePicker.Segment>
        {:else}
          <BitsDatePicker.Segment
            class='date-segment'
            {part}>
            {value}
          </BitsDatePicker.Segment>
        {/if}
      {/each}
      <BitsDatePicker.Trigger
        class='bundle-redeem-button'>
        {buttonText}
      </BitsDatePicker.Trigger>
    {/snippet}
  </BitsDatePicker.Input>
  <BitsDatePicker.Content
    class='date-picker-content'>
    <BitsDatePicker.Calendar
      class='date-picker-calendar'>
      {#snippet children({ months, weekdays })}
        <BitsDatePicker.Header
          class='calendar-header'>
          <BitsDatePicker.PrevButton
            class='calendar-nav-button'>←</BitsDatePicker.PrevButton>
          <BitsDatePicker.Heading
            class='calendar-heading' />
          <BitsDatePicker.NextButton
            class='calendar-nav-button'>→</BitsDatePicker.NextButton>
        </BitsDatePicker.Header>
        {#each months as month (month.value)}
          <BitsDatePicker.Grid
            class='calendar-grid'>
            <BitsDatePicker.GridHead>
              <BitsDatePicker.GridRow
                class='calendar-weekdays'>
                {#each weekdays as day, i (i)}
                  <BitsDatePicker.HeadCell
                    class='calendar-weekday'>
                    {day.slice(0, 2)}
                  </BitsDatePicker.HeadCell>
                {/each}
              </BitsDatePicker.GridRow>
            </BitsDatePicker.GridHead>
            <BitsDatePicker.GridBody>
              {#each month.weeks as weekDates (weekDates)}
                <BitsDatePicker.GridRow
                  class='calendar-week'>
                  {#each weekDates as date (date)}
                    <BitsDatePicker.Cell
                      class='calendar-cell'
                      {date}
                      month={month.value}>
                      <BitsDatePicker.Day
                        class='calendar-day'>
                        {date.day}
                      </BitsDatePicker.Day>
                    </BitsDatePicker.Cell>
                  {/each}
                </BitsDatePicker.GridRow>
              {/each}
            </BitsDatePicker.GridBody>
          </BitsDatePicker.Grid>
        {/each}
      {/snippet}
    </BitsDatePicker.Calendar>
  </BitsDatePicker.Content>
</BitsDatePicker.Root>
