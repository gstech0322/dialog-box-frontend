import React from "react";
import cn from "classnames";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from "./Dashboard.module.sass";
import Aboutus from "./Aboutus";
import Charity from "./Charity";
import Admin from "./Admin";
import Collection from "./Collection";

const Dashboard = () => {
    return (
        <div className={cn("container")}>
            <div className={styles.dashboard_section}>
                <Tabs>
                    <TabList>
                        <Tab>
                            <a className={styles.dashboard_font}>About us</a>
                        </Tab>
                        <Tab>
                            <a className={styles.dashboard_font}>Charity</a>
                        </Tab>
                        <Tab>
                            <a className={styles.dashboard_font}>Admin</a>
                        </Tab>
                        <Tab>
                            <a className={styles.dashboard_font}>Collection</a>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <Aboutus />
                    </TabPanel>
                    <TabPanel>
                        <Charity />
                    </TabPanel>
                    <TabPanel>
                        <Admin />
                    </TabPanel>
                    <TabPanel>
                        <Collection />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
};

export default Dashboard;