import React from 'react';
import type { Company } from '../services/companyService';

interface CompanyTableProps {
  companies: Company[];
  loading: boolean;
  error?: string;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ companies, loading, error }) => (
  <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white text-black">
    <table className="table">
      <thead className="bg-gray-100 text-black">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>RUC</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <tr key={`skeleton-${idx}`}>
              <td><div className="skeleton h-4 w-24"></div></td>
              <td><div className="skeleton h-4 w-32"></div></td>
              <td><div className="skeleton h-4 w-24"></div></td>
              <td><div className="skeleton h-4 w-40"></div></td>
              <td><div className="skeleton h-4 w-24"></div></td>
              <td><div className="skeleton h-4 w-40"></div></td>
            </tr>
          ))
        ) : error ? (
          <tr><td colSpan={6} className="text-red-600 text-center">{error}</td></tr>
        ) : (
          companies.map((company) => (
            <tr key={company.id_empresa}>
              <td>{company.id_empresa}</td>
              <td>{company.nombre}</td>
              <td>{company.ruc}</td>
              <td>{company.direccion}</td>
              <td>{company.telefono}</td>
              <td>{company.email}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default CompanyTable;
