import TambahBarangForm from "./form";
import { Heading, Text } from "@/components/ui/typography";
import { PageShell, PageHeader } from "@/components/ui/page-shell";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TambahBarangPage() {
  return (
    <PageShell>
      <PageHeader data-motion="rise" className="flex-col gap-1">
        <Heading as="h1" size="page">
          Tambah Barang
        </Heading>
          <Text tone="muted">
          Tambahkan barang baru ke sistem inventaris.
        </Text>
      </PageHeader>

      <Card data-motion="pop" data-motion-delay="80" className="w-full max-w-(--ds-form-max-width)">
        <CardHeader>
          <CardTitle>Informasi Barang</CardTitle>
          <CardDescription>
            Lengkapi data barang di bawah ini.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TambahBarangForm />
        </CardContent>
      </Card>
    </PageShell>
  );
}