// import { IonCard, IonIcon } from "@ionic/react";
// import { chevronForward } from "ionicons/icons";
// import { useCallback } from "react";
// import { TabItemMiscMenuInfos } from "../../services/router/interfaces/tab-item.interface";
// import { trackingService } from "../../services/tracking/tracking.service";

// import "./MenuCard.scss";

// export interface MenuCardProps {
//   item: TabItemMiscMenuInfos;
//   disabled?: boolean;
// }
// export const MenuCard: React.FC<MenuCardProps> = ({ item, disabled }) => {
//   const handleCardClick = useCallback(() => {
//     if (!disabled) {
//       trackingService.trackEvent("Navigate", { to: item.href });
//       if (item.action) {
//         item.action!(...(item.actionParams || []));
//       }
//     }
//   }, []);

//   return (
//     <IonCard
//       disabled={disabled}
//       className="menu-card"
//       key={item.href}
//       routerLink={!item.action ? item.href : undefined}
//       onClick={handleCardClick}
//     >
//       <div className="menu-card__container">
//         <div className="menu-card__container__main">
//           <span className="menu-card__container__main__icon">{item.icon}</span>
//           <span className="menu-card__container__main__title">
//             {item.title}
//           </span>
//         </div>
//       </div>
//       <div className="menu-card__icon">
//         <IonIcon icon={chevronForward} />
//       </div>
//     </IonCard>
//   );
// };
