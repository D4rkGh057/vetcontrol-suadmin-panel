import React, { useEffect, useState } from 'react';
import { getCompanies } from '../services/companyService';
import type { Company } from '../services/companyService';
import CompanyTable from '../components/CompanyTable';
import Modal from '../components/Modal';
import CompanyForm from '../components/CompanyForm';

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const reloadCompanies = () => {
    setLoading(true);
    getCompanies()
      .then(setCompanies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reloadCompanies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Empresas</h1>
      <div className="mb-4 flex justify-end">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow"
          onClick={() => setModalOpen(true)}
        >
          Crear Empresa
        </button>
      </div>
      <CompanyTable companies={companies} loading={loading} error={error} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CompanyForm
          onSuccess={() => {
            reloadCompanies();
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Companies;
