import React, { useEffect, useState } from "react";
import axios from 'axios';

type CommonValue = {
    id: number
    name: string
};

type Log = {
    date: Date,
    applience: string,
    command: string,
    result : string
}

export default function RemotePage() {
    const [appliances, setAppliances] = useState<CommonValue[]>([]);
    const [commands, setCommands] = useState<CommonValue[]>([]);
    const [applianceId, setApplianceId] = useState<string>("");
    const [commandId, setCommandId] = useState<string>("");
    const [logs, setLog] = useState<Log[]>([]);
    const addLogs = (log: Log) => {
        setLog([...logs, log])
    }

    useEffect(() => {
        const fetchData = async () => {
            const responce = await fetch(`${process.env.REACT_APP_IR_API_BASE_URL}/Appliances`);
            setAppliances((await responce.json()).appliances);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!applianceId) return;
            const responce = await fetch(`${process.env.REACT_APP_IR_API_BASE_URL}/Appliances/${applianceId}/Commands`);
            setCommands((await responce.json()).remote_commands);
        };
        fetchData();
    }, [applianceId]);

    async function onClickButton() {
        if (!commandId) return;
        const headers = {"Content-type": "application/json"};
        const response = await axios.post(`${process.env.REACT_APP_IR_API_BASE_URL}/Remote/Send/${commandId}`, {}, { headers });
        console.log((await response.data));
        addLogs({date: new Date(), applience: response.data.appliance, command: response.data.command, result: response.data.result.toString() } as Log);
    }

    return (
        <main>
            <div id="content" style={{ padding:"10px;"}} className="table-responsive my-3">
                <h2>IR Console</h2>
                <label>Send</label>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="">
                            <label className="control-label col-xs-2"><label>IR Applience:</label></label>
                            <div className="col-xs-5">
                                <select className="form-control form-control-sm input-sm" onChange={(e) => setApplianceId(e.target.value)}>
                                    <option value="">-</option>
                                    {appliances.map((appliance) => (
                                        <option key={appliance.id} value={appliance.id}>{appliance.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="">
                            <label className="control-label col-xs-2"><label>IR Command:</label></label>
                            <div className="col-xs-5">
                                <select className="form-control form-control-sm input-sm" onChange={(e) => setCommandId(e.target.value)}>
                                <option value="">-</option>
                                    {commands.map((command) => (
                                        <option key={command.id} value={command.id}>{command.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="">
                            <label className="control-label col-xs-2"><label>Control:</label></label>
                            <div className="col-xs-5">
                                <button className="btn btn-success btn-sm" onClick={() => onClickButton()}>execute</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <label>Log</label>
            <table className="table table-striped table-sm table-hover table-responsive table-bordered" id='logtable'>
                <thead className="thead-light table-hover">
                    <tr>
                        <th align="left">Date</th>
                        <th align="left">Applience</th>
                        <th align="left">Command</th>
                        <th align="left">Command</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr>
                            <td><div id="date">{log.date.toLocaleString()}</div></td>
                            <td><div id="sendedfilename">{log.applience}</div></td>
                            <td><div id="sendedcommand">{log.command}</div></td>
                            <td><div id="result">{log.result}</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
