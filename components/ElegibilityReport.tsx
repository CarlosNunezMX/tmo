import ActionResponse from "@/lib/actionResponse";
import { TMO } from "@carlosnunezmx/tmo-api";
import Container from "./Common";

interface EligibilityReportItemProps extends React.PropsWithChildren {
  name: string
};

function EligibilityReportItem({ name, children }: EligibilityReportItemProps) {
  return <div className="flex overflow-scroll flex-col">
    <h3 className="font-bold font-xs">{name}</h3>
    <p className="font-medium">{children}</p>
  </div>
}

function EligibilityReportReason({ details: reasons }: { details: TMO.InEligibility.Reason[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-lg">Inelegibility Reasons</h3>
      {reasons.map((item, i) => (
        <div className="grid grid-cols-2" key={i}>
          <EligibilityReportItem name="Code">{item.code}</EligibilityReportItem>
          <EligibilityReportItem name="Description">{item.description}</EligibilityReportItem>
        </div>
      ))}

    </div>
  )
}

function EligibilityReportStatusItems({ data }: { data: TMO.InEligibility.StatusItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-lg">Device State Impediments</h3>
      {data.map((item, i) => (
        <div className="grid md:grid-cols-3 " key={i}>
          <EligibilityReportItem name="Status code">{item.statusCode}</EligibilityReportItem>
          <EligibilityReportItem name="Description">{item.statusDescription}</EligibilityReportItem>
          <EligibilityReportItem name="Explanation">{item.explanation}</EligibilityReportItem>
          <EligibilityReportItem name="Reference ID">{item.referenceId}</EligibilityReportItem>
        </div>
      ))}
    </div>
  )
}

export default function EligibilityReport(eligibility: ActionResponse<TMO.Eligibility.Response>) {
  if (eligibility.data.length === 0) return (
    <div></div>
  )


  if (eligibility.data.every(item => item.currentUnlockStatus)) {
    return (
      <Container>
        <h2 className="text-center text-xl font-bold text-green-700 dark:text-green-400">🎉 Congratulations!</h2>
        <p className="font-bold text-center">Your device is already unlocked!</p>
      </Container>
    )
  }

  return eligibility.data.map(
    (item, i) => {
      const eligible = item.unlockEligible;
      return (
        <Container key={i}>
          <h2 className="text-xl font-black text-center">Eligibility Report</h2>
          <div className="grid gap-2 md:grid-cols-3">
            <EligibilityReportItem name="IMEI">{item.imei}</EligibilityReportItem>
            <EligibilityReportItem name="Unlock Type">{item.unlockType === TMO.Eligibility.Type.TEMPORARY ? "Temporary" : "Permanent"}</EligibilityReportItem>
            <EligibilityReportItem name="Could be unlocked?">
              <span className={eligible ? "text-green-400" : "text-red-400"}>
                {eligible ? "Eligible" : "Ineligible"}
              </span>
            </EligibilityReportItem>
          </div>

          {item.ineligiblityDetails.ineligiblityDetails && <EligibilityReportReason details={item.ineligiblityDetails.ineligiblityDetails!} />}
          {item.ineligiblityDetails.statusItems && <EligibilityReportStatusItems data={item.ineligiblityDetails.statusItems!} />}
        </Container>
      )
    }
  )

}
