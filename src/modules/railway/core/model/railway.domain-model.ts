import { Feature, FeatureCollection } from "geojson";

//We use namespace just to structure the code
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RailwayDomainModel {

    export type RailwayStatus =  "PROJET" | "EXPLOITE" | "NEUT" |
                                 "NEUT DEF" | "VS" | "FERME ND" |
                                 "FERME MV" | "FERME D" | "FERME" |
                                 "FERME DT" | "RETRANCHE" | "DEC NV" | "DEC V"
    
    export type RailwayProperties = {
        mnemo: RailwayStatus,
        code_ligne:string,
        geo_point_2d:[number, number],
        libelle:string,
        rg_troncon:number,
        pk_fin_r:string,
        pk_debut_r:string
    }

    export interface RailwaysFeature extends Feature {
        properties:RailwayProperties
    }

    export interface RailwaysGeometryCollection extends FeatureCollection {
        features:Array<RailwaysFeature>

    }

    export type State = {
        data:RailwaysGeometryCollection,
        status:"idle" | "loading" | "success" | "error",
        error:string
    }
} 