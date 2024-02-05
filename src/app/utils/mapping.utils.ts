import { ChartData } from '../interfaces/chart.interface';
import { NavigationRoute } from '../interfaces/map.interface';

export class MappingUtils {
  public static mapCsvToRouteArray(parsedData: any): any[] {
    const [headers, ...pointsData]: any[] = Object.values(parsedData.data);

    return pointsData.map((point: any) =>
      headers.reduce((obj: any, header: any, index: any) => {
        obj[header] = point[index];
        return obj;
      }, {})
    );
  }

  public static mapRoutePointsToGpsPoint(
    route: NavigationRoute
  ): L.LatLngExpression[] {
    const parsedPoints: number[][] = JSON.parse(route.points);
    return parsedPoints.map((data: number[]) => {
      return {
        lng: data[0],
        lat: data[1],
      };
    });
  }

  public static mapRouteToChartData(route: NavigationRoute): ChartData[] {
    const parsedPoints: number[][] = JSON.parse(route.points);
    return parsedPoints.map((data: number[]) => {
      return {
        timestamp: data[2],
        speed: data[3],
      };
    });
  }
}
