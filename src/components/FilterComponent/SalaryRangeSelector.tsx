import { DualRangeSlider, DualRangeSliderProps } from '../core/slider'

interface SalaryRangeSelectorProps extends Omit<DualRangeSliderProps, 'value' | 'onValueChange'> {
  value: [number, number]
  onValueChange: (val: [number, number]) => void
}

export default function SalaryRangeSelector({
  value,
  onValueChange,
  ...props
}: SalaryRangeSelectorProps) {
  return (
    <div className='w-3/5 mx-auto space-y-20'>
      <DualRangeSlider
        value={value}
        onValueChange={onValueChange}
        {...props}
      />
    </div>
  )
}
