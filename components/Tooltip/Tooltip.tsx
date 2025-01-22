export interface TooltipProps {
  title: string;
  details: string;
}

export const Tooltip = ({ title, details }: TooltipProps) => {
  return (
    <div className='flex w-full justify-center'>
      <div className='tooltip tooltip-bottom' data-tip={details}>
        <div className='badge badge-warning badge-outline uppercase mt-1'>
          {title}
        </div>
      </div>
    </div>
  );
};
