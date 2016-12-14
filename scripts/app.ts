import { WorkItemFormService } from "TFS/WorkItemTracking/Services";
import { IWorkItemNotificationListener } from "TFS/WorkItemTracking/ExtensionContracts";


let callCount = 0;
interface IMenuItemsContext {
    closeWorkItemFormDialogDelegate?: Function;
    currentProjectGuid: string;
    currentProjectName: string;
    hideDelete: false;
    movedToNewProject: false;
    tfsContext: any;
    updateMenuItems: (menuItems: IContributedMenuItem[]) => IPromise<void>;
    workItemAvailable: boolean;
    workItemDirty: boolean;
    workItemId: number;
    workItemTypeName: string;
}

let menuItemsContext: IMenuItemsContext;
function getMenuItems(): IPromise<IContributedMenuItem & { dynamic?: boolean }[]> {
    return WorkItemFormService.getService().then(service => {
        return service.getFieldValue("System.Title").then(val => {
            const menuItems = [{
                title: "Menu Items Group",
                text: `Dynamic menu item, generated ${++callCount} times`,
                disabled: val !== "Enabled",
                action: context => alert("executing my action"),
                // icon: "img/icon.png",
                dynamic: true,
            }];
            return menuItems;
        });
    });
}

// will be recomputed each time the work item changes
const menuContributionHandler: IContributedMenuSource & Partial<IWorkItemNotificationListener> = {
    getMenuItems: function (context: IMenuItemsContext) {
        menuItemsContext = context;
        return getMenuItems();
    },
    onFieldChanged: context => {
        getMenuItems().then(menuItems =>
            menuItemsContext && menuItemsContext.updateMenuItems(menuItems)
        );
    }
};


VSS.register(VSS.getContribution().id, menuContributionHandler);
