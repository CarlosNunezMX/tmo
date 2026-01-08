import ActionResponse from "@/lib/actionResponse";
import { TMO } from "@carlosnunezmx/tmo-api";
import Container from "./Common";

interface ElegibilityReportItemProps extends React.PropsWithChildren {
  name: string
};

function ElegibilityReportItem({ name, children }: ElegibilityReportItemProps) {
  return <div className="flex flex-col">
    <h3 className="font-bold font-sm">{name}</h3>
    <p className="font-medium">{children}</p>
  </div>
}

function ElegibilityReportReason(props: TMO.Inelegibility.Details) {
  return (
    <div className="flex flex-col gap-3">
      <h3>Inelegibility Reasons</h3>
      {props.ineligiblityDetails.map((item, i) => (
        <div className="grid grid-cols-2">
          <ElegibilityReportItem name="Code" key={i}>{item.code}</ElegibilityReportItem>
          <ElegibilityReportItem name="Description" key={i}>{item.description}</ElegibilityReportItem>
        </div>
      ))}

    </div>
  )
}

export default function ElegibilityReport(elegibility: ActionResponse<TMO.Elegibility.Response>) {
  const elegible = elegibility.data!.unlockEligible;
  const unlockType = elegibility.data!.unlockType;
  return (
    <Container>
      <h2 className="text-xl font-black text-center">Elegibility Report</h2>
      <div className="grid grid-cols-3">
        <ElegibilityReportItem name="IMEI">{elegibility.data!.imei}</ElegibilityReportItem>
        <ElegibilityReportItem name="Unlock Type">{elegibility.data!.unlockType === TMO.Elegibility.Type.TEMPORAL ? "Temporal" : "Permanent"}</ElegibilityReportItem>
        <ElegibilityReportItem name="Could be unlocked?">
          <span className={elegible ? "text-green-400" : "text-red-400"}>
            {elegible ? "Elegible" : "Inelegible"}
          </span>
        </ElegibilityReportItem>
      </div>

      {!elegible && <ElegibilityReportReason {...elegibility.data!.ineligiblityDetails} />}
    </Container>
  )
}
