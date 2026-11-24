"use client";

import {
  Calendar,
  DateField,
  DatePicker,
  Description,
  FieldError,
  Label,
  NumberField,
} from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  todayInKenya,
  campaignLength,
  formatCampaignDate,
} from "@/lib/campaignDates";
import {
  type FundingErrors,
  validateFunding,
} from "@/lib/validation/campaignFunding";
import type { CampaignData } from "./types";
import { useState } from "react";

type Props = {
  data: CampaignData;
  onUpdate: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
};

// The calendar that opens from each date field's icon button.
function CampaignCalendar({ label }: { label: string }) {
  return (
    <DatePicker.Popover>
      <Calendar aria-label={label}>
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {(date) => <Calendar.Cell date={date} />}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
    </DatePicker.Popover>
  );
}

export default function StepFunding({ data, onUpdate, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<FundingErrors>({});

  const handleNext = () => {
    const result = validateFunding(data);
    setErrors(result);
    if (Object.keys(result).length === 0) onNext();
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-16">
        {/* Funding goal */}
        <NumberField
          fullWidth
          name="goal"
          step={1}
          formatOptions={{ maximumFractionDigits: 0 }}
          value={data.goal ?? NaN}
          onChange={(v) => {
            onUpdate({ goal: Number.isNaN(v) ? null : v });
            setErrors((prev) => ({ ...prev, goal: undefined }));
          }}
          isInvalid={!!errors.goal}
        >
          <Label>Funding Goal (KES)</Label>
          <NumberField.Group>
            <NumberField.Input placeholder="500,000" />
          </NumberField.Group>
          <Description className="mt-1 text-xs text-body-gray">
            The goal can&apos;t be changed once the campaign is live
          </Description>
          <FieldError>{errors.goal}</FieldError>
        </NumberField>

        {/* Start date: starts a new row on md+ */}
        <DatePicker
          name="startDate"
          minValue={todayInKenya()}
          className="w-full md:col-start-1"
          value={data.startDate}
          onChange={(d) => {
            onUpdate({ startDate: d });
            setErrors((prev) => ({ ...prev, startDate: undefined, endDate: undefined }));
          }}
          isInvalid={!!errors.startDate}
        >
          <Label>Campaign Start Date</Label>
          <DateField.Group fullWidth>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <FieldError>{errors.startDate}</FieldError>
          <CampaignCalendar label="Campaign start date" />
        </DatePicker>

        {/* End date */}
        <DatePicker
          name="endDate"
          className="w-full"
          value={data.endDate}
          onChange={(d) => {
            onUpdate({ endDate: d });
            setErrors((prev) => ({ ...prev, endDate: undefined }));
          }}
          minValue={data.startDate?.add({ days: 1 }) ?? todayInKenya()}
          isInvalid={!!errors.endDate}
        >
          <Label>Campaign End Date</Label>
          <DateField.Group fullWidth>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <Description className="mt-1 text-xs text-body-gray">
            {data.startDate && data.endDate
              ? `Runs for ${campaignLength(data.startDate, data.endDate)} days · ends ${formatCampaignDate(data.endDate)}`
              : "Pick both dates to see how long your campaign runs"}
          </Description>
          <FieldError>{errors.endDate}</FieldError>
          <CampaignCalendar label="Campaign end date" />
        </DatePicker>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          type="button"
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft size={22} />
          Back
        </button>
        <button
          onClick={handleNext}
          type="button"
          className="btn-primary flex items-center gap-2"
        >
          Next
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
